export const Component = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  MongoDatabase: Symbol.for('MongoDatabase'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModer'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel')
} as const;
