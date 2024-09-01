import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateOrderAndItems1653500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newOrderAndItemsTableOptions = {
      name: "OrderAndItems",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isNullable: false,
          isUnique: true,
        },

        {
          name: "quantity",
          type: "integer",
        },
        {
          name: "price",
          type: "real",
        },
        {
          name: "discount",
          type: "real",
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
        {
          name: "itemId",
          type: "uuid",
          isNullable: false,
        },
        {
          name: "ordersId",
          type: "uuid",
          isNullable: false,
        },
      ],
    };

    const newOrderAndItemsTable = new Table(newOrderAndItemsTableOptions);

    await queryRunner.createTable(newOrderAndItemsTable);

    await queryRunner.createIndex(
      "OrderAndItems",
      new TableIndex({
        name: "IDX_ORDERANDITEMS_ID",
        columnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "OrderAndItems",
      new TableForeignKey({
        name: "FK_ORDERANDITEMS_ITEM",
        columnNames: ["itemId"],
        referencedColumnNames: ["id"],
        referencedTableName: "Item",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "OrderAndItems",
      new TableForeignKey({
        name: "FK_ORDERANDITEMS_ORDERS",
        columnNames: ["ordersId"],
        referencedColumnNames: ["id"],
        referencedTableName: "Orders",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("OrderAndItems", "IDX_ORDERANDITEMS_ID");

    await queryRunner.dropForeignKey("OrderAndItems", "FK_ORDERANDITEMS_ITEM");

    await queryRunner.dropForeignKey("OrderAndItems", "FK_ORDERANDITEMS_ORDERS");

    await queryRunner.dropTable("OrderAndItems");
  }
}
