import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableOptions } from "typeorm"

export class CreateOrders0000000000004 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const newOrdersTableOptions:TableOptions = {
            name:"Orders",
            columns:[
                {
                    name:"orderId",
                    type:"uuid",
                    isPrimary: true,
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: "km",
                    type: "integer",
                },
                {
                    name: "fuel",
                    type: "integer",
                },
                {
                    name: "statusExecution",
                    type: "varchar",
                },
                {
                    name:"statusOrder",
                    type:"boolean",
                    isNullable: false,
                    default:false,
                },
                {
                    name:"createdAt",
                    type:"timestamp",
                    isNullable: false,
                    default:"now()",
                },
                {
                    name:"deleted",
                    type:"boolean",
                    isNullable: false,
                    default:false,
                },
                {
                    name:"updated",
                    type:"timestamp",
                    isNullable: false,
                    default:"now()",
                },
                {
                    name:"userId",
                    type:"uuid",
                    isNullable: false,
                },
                {
                    name:"carId",
                    type:"uuid",
                    isNullable: false,
                },
            ]
        };


        await queryRunner.createTable(new Table(newOrdersTableOptions));

        await queryRunner.createIndex(
            "Orders",
            new TableIndex({
                name: "IDX_ORDERS_ORDERID",
                columnNames: ["orderId"],
            })
        );

        await queryRunner.createIndex(
            "Orders",
            new TableIndex({
                name: "IDX_ORDERS_CREATEDAT",
                columnNames: ["createdAt"],
            })
        );

        await queryRunner.createIndex(
            "Orders",
            new TableIndex({
                name: "IDX_ORDERS_UPDATED",
                columnNames: ["updated"],
            })
        );

        await queryRunner.createForeignKey(
            "Orders",
            new TableForeignKey({
              name: "FK_ORDERS_CAR",
              columnNames: ["carId"],
              referencedColumnNames: ["carId"],
              referencedTableName: "Car",
              onDelete: "CASCADE",
            })
          );

          await queryRunner.createForeignKey(
            "Orders",
            new TableForeignKey({
              name: "FK_ORDERS_USER",
              columnNames: ["userId"],
              referencedColumnNames: ["userId"],
              referencedTableName: "User",
              onDelete: "CASCADE",
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.dropIndex("Orders", "IDX_ORDERS_ORDERID");

        await queryRunner.dropIndex("Orders", "IDX_ORDERS_CREATEDAT");

        await queryRunner.dropIndex("Orders", "IDX_ORDERS_UPDATED");

        await queryRunner.dropForeignKey("Orders", "FK_ORDERS_CAR");

        await queryRunner.dropForeignKey("Orders", "FK_ORDERS_USER");

        await queryRunner.dropTable("Orders");
    }

}
