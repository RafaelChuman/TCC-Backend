import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateGroup1652300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Group",
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
            name: "temperature",
            type: "integer",
          },
          {
            name: "humidity",
            type: "integer",
          },
          {
            name: "noBreak",
            type: "integer",
          },
          {
            name: "userId",
            type: "uuid",
            isNullable: false,
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
      "Group",
      new TableIndex({
        name: "IDX_GROUP_NAME",
        columnNames: ["name"],
      })
    );

    await queryRunner.createForeignKey(
      "Group",
      new TableForeignKey({
        name: "FK_GROUP_USER",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "User",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("Group", "IDX_GROUP_NAME");

    await queryRunner.dropForeignKey("Group", "FK_GROUP_USER");

    await queryRunner.dropTable("Group");
  }
}
