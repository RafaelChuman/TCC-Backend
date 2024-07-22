import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateIoTMonitor1653500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newIoTMonitorTableOptions = {
      name: "IoTMonitor",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isNullable: false,
          isUnique: true,
        },

        {
          name: "temperature",
          type: "real",
        },
        {
          name: "humidity",
          type: "real",
        },
        {
          name: "noBreak",
          type: "boolean",
        },
        {
          name: "createdAt",
          type: "timestamp",
          default: "now()",
        },
        {
          name: "ioTId",
          type: "uuid",
        },
      ],
    };

    const newIoTMonitorTable = new Table(newIoTMonitorTableOptions);

    await queryRunner.createTable(newIoTMonitorTable);

    await queryRunner.createIndex(
      "IoTMonitor",
      new TableIndex({
        name: "IDX_IOTMONITOR_ID",
        columnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "IoTMonitor",
      new TableForeignKey({
        name: "FK_IOTMONITOR_IOT",
        columnNames: ["ioTId"],
        referencedColumnNames: ["id"],
        referencedTableName: "IoT",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("IoTMonitor", "IDX_IOTMONITOR_ID");

    await queryRunner.dropForeignKey("IoTMonitor", "FK_IOTMONITOR_IOT");

    await queryRunner.dropTable("IoTMonitor");
  }
}
