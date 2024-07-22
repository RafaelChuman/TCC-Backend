import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
  TableOptions,
} from "typeorm";

export class CreateIoT1653300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newIoTTableOptions: TableOptions = {
      name: "IoT",
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
          name: "createdAt",
          type: "timestamp",
          isNullable: false,
          default: "now()",
        },
        {
          name: "groupId",
          type: "uuid",
          isNullable: false,
        },
      ],
    };

    await queryRunner.createTable(new Table(newIoTTableOptions));

    await queryRunner.createIndex(
      "IoT",
      new TableIndex({
        name: "IDX_IOT_ID",
        columnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "IoT",
      new TableForeignKey({
        name: "FK_IOT_GROUP",
        columnNames: ["groupId"],
        referencedColumnNames: ["id"],
        referencedTableName: "Group",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("IoT", "FK_IOT_GROUP");

    await queryRunner.dropIndex("IoT", "IDX_IOT_ID");

    await queryRunner.dropTable("IoT");
  }
}
