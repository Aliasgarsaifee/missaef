import { site } from '../data/site';

/**
 * The first line typed into WhatsApp for a visitor who taps the plain
 * "Chat on WhatsApp" button without filling in the order form.
 * Wording is a first draft for Fatema to edit.
 */
export function enquiryMessage(): string {
  return `Hello Fatema, I found you through the ${site.name} site and would like to know more.`;
}
