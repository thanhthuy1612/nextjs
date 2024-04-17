import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  github: string;

  @Prop()
  refreshToken: string;

  @Prop()
  twoFactorAuthenticationSecret: string;

  @Prop()
  isTwoFactorAuthenticationEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
