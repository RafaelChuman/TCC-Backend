import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateItem0000000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Item",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "type",
            type: "varchar",
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
      "Item",
      new TableIndex({
        name: "IDX_ITEM_NAME",
        columnNames: ["name"],
      })
    );

    await queryRunner.createIndex(
      "Item",
      new TableIndex({
        name: "IDX_ITEM_CREATEDAT",
        columnNames: ["createdAt"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("Item", "IDX_ITEM_NAME");

    await queryRunner.dropIndex("Item", "IDX_ITEM_CREATEDAT");


    await queryRunner.dropTable("Item");
  }
}
