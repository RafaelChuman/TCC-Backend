import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableOptions } from "typeorm"

export class CreateRescueGroup1653000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        const newRescueGroupTableOptions:TableOptions = {
            name:"RescueGroup",
            columns:[
                {
                    name:"id",
                    type:"uuid",
                    isPrimary: true,
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name:"groupId",
                    type:"uuid",
                    isNullable: false,
                },
                {
                    name:"userId",
                    type:"uuid",
                    isNullable: false,
                },
                {
                    name:"createdAt",
                    type:"timestamp",
                    isNullable: false,
                    default:"now()",
                },
            ]
        };


        await queryRunner.createTable(new Table(newRescueGroupTableOptions));

        await queryRunner.createIndex(
            "RescueGroup",
            new TableIndex({
                name: "IDX_RESCUEGROUP_NAME",
                columnNames: ["userId"],
            })
        );

        await queryRunner.createForeignKey(
            "RescueGroup",
            new TableForeignKey({
              name: "FK_RESCUEGROUP_GROUP",
              columnNames: ["groupId"],
              referencedColumnNames: ["id"],
              referencedTableName: "Group",
              onDelete: "CASCADE",
            })
          );

          await queryRunner.createForeignKey(
            "RescueGroup",
            new TableForeignKey({
              name: "FK_RESCUEGROUP_USER",
              columnNames: ["userId"],
              referencedColumnNames: ["id"],
              referencedTableName: "User",
              onDelete: "CASCADE",
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropIndex("RescueGroup", "IDX_RESCUEGROUP_NAME");

        await queryRunner.dropForeignKey("RescueGroup", "FK_RESCUEGROUP_GROUP");

        await queryRunner.dropForeignKey("RescueGroup", "FK_RESCUEGROUP_USER");

        await queryRunner.dropTable("RescueGroup");
    }

}
