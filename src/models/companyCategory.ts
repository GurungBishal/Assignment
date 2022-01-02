import { Document, Schema, model } from 'mongoose';

export interface ICompanyCategory extends Document<Number> {
  title: string;
}

const CompanyCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'company_category',
  },
);

export const CompanyCategory = model<ICompanyCategory>(
  'CompanyCategory',
  CompanyCategorySchema,
);
