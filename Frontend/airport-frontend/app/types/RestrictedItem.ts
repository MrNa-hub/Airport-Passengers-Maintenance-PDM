// File: app/types/RestrictedItem.ts

export interface RestrictedItem {
  /** Primary Key: RI00001 */
  itemID: string;

  /** Name of the prohibited/restricted item */
  name: string;

  /** Optional description of the item */
  description: string | null;

  /** Item category (e.g., Sharp, Liquid, Flammable) */
  category: string | null;
}
