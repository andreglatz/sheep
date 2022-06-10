export class Role {
  public readonly id: string;
  public readonly description: string;

  constructor(params: Partial<Role>) {
    this.id = params.id || crypto.randomUUID();
    this.description = params.description;
  }
}
