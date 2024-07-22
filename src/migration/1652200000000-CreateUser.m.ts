import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser1652200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "User",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "userName",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "imgPath",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "celular",
            type: "float",
          },
          {
            name: "telegram",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "boolean",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "User",
      new TableIndex({
        name: "IDX_USER_NAME",
        columnNames: ["userName"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("User", "IDX_USER_NAME");

    await queryRunner.dropTable("User");
  }
}
