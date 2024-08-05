export function setMongoDBUri(
  username: string,
  password: string,
): string {
  return `mongodb+srv://${username}:${password}@atlascluster.afeoail.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;
}
