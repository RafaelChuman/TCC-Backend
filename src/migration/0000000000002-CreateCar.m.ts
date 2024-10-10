import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableOptions,
} from "typeorm";

export class CreateCar0000000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newIoTTableOptions: TableOptions = {
      name: "Car",
      columns: [
        {
          name: "carId",
          type: "uuid",
          isPrimary: true,
          isNullable: false,
          isUnique: true,
        },
        {
          name: "brand",
          type: "varchar",
        },
        {
          name: "model",
          type: "varchar",
        },
        {
          name: "kind",
          type: "varchar",
        },
        {
          name: "type",
          type: "varchar",
        },
        {
          name: "plate",
          type: "varchar",
        },
        {
          name: "yearOfFabrication",
          type: "integer",
        },
        {
          name: "yearOfModel",
          type: "integer",
        },
        {
          name: "color",
          type: "varchar",
        },
        {
          name: "createdAt",
          type: "timestamp",
          isNullable: false,
          default: "now()",
        },
        {
          name: "deleted",
          type: "boolean",
          isNullable: false,
          default: false,
        },
        {
          name: "updated",
          type: "timestamp",
          isNullable: false,
          default: "now()",
        },
        {
          name: "userId",
          type: "uuid",
          isNullable: false,
        },
      ],
    };

    await queryRunner.createTable(new Table(newIoTTableOptions));

    await queryRunner.createIndex(
      "Car",
      new TableIndex({
        name: "IDX_CAR_ID",
        columnNames: ["id"],
      })
    );

    await queryRunner.createIndex(
      "Car",
      new TableIndex({
        name: "IDX_CAR_CREATEDAT",
        columnNames: ["createdAt"],
      })
    );

    await queryRunner.createIndex(
      "Car",
      new TableIndex({
        name: "IDX_CAR_PLATE",
        columnNames: ["plate"],
      })
    );


    await queryRunner.createForeignKey(
      "Car",
      new TableForeignKey({
        name: "FK_CAR_GROUP",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "User",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("Car", "FK_CAR_GROUP");

    await queryRunner.dropIndex("Car", "IDX_CAR_PLATE");
    await queryRunner.dropIndex("Car", "IDX_CAR_CREATEDAT");
    await queryRunner.dropIndex("Car", "IDX_CAR_ID");

    await queryRunner.dropTable("Car");
  }
}
