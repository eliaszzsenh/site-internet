import { type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class JsonStorage implements IStorage {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "leads.json");
    this.ensureFile();
  }

  private async ensureFile() {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify([], null, 2));
    }
  }

  private async readContacts(): Promise<Contact[]> {
    await this.ensureFile();
    const data = await fs.readFile(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  private async writeContacts(contacts: Contact[]) {
    await fs.writeFile(this.filePath, JSON.stringify(contacts, null, 2));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contacts = await this.readContacts();
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date().toISOString() 
    };
    contacts.push(contact);
    await this.writeContacts(contacts);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.readContacts();
  }
}

export const storage = new JsonStorage();
