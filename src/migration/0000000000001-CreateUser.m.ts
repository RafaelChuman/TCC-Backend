import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUser0000000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "User",
        columns: [
          {
            name: "userId",
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
            name: "cellphone",
            type: "varchar",
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
          {
            name: "deleted",
            type: "boolean",
            default: false,
          },
          {
            name: "updated",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "User",
      new TableIndex({
        name: "IDX_USER_USERID",
        columnNames: ["userId"],
      })
    );

    await queryRunner.createIndex(
      "User",
      new TableIndex({
        name: "IDX_USER_NAME",
        columnNames: ["userName"],
      })
    );

    await queryRunner.createIndex(
      "User",
      new TableIndex({
        name: "IDX_USER_CREATEDAT",
        columnNames: ["createdAt"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropIndex("User", "IDX_USER_USERID");
    await queryRunner.dropIndex("User", "IDX_USER_NAME");
    await queryRunner.dropIndex("User", "IDX_USER_CREATEDAT");

    await queryRunner.dropTable("User");
  }
}
