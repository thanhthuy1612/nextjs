import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email: string;

  @Prop({ type: Date })
  timeJoin: Date;

  @Prop()
  refreshToken: string;

  @Prop()
  twoFactorAuthenticationSecret: string;

  @Prop()
  isTwoFactorAuthenticationEnabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
