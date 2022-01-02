import { Document, model, Schema } from 'mongoose';

export interface ICompany extends Document<number> {
  title: string;
  image: string;
  description: string;
  status: string;
  category_id: string;
}

const ICompanySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'CompanyCategory',
    },
  },
  {
    timestamps: true,
    collection: 'company',
  },
);

export const Company = model<ICompany>('Company', ICompanySchema);
