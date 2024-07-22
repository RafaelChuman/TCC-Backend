import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { IoT } from "../IoT/IoT";


@Entity("IoTMonitor")
export class IoTMonitor {
    @PrimaryColumn()
    id: string;

    @Column()
    temperature: number;

    @Column()
    humidity: number;

    @Column()
    noBreak: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => IoT, (ioT) => ioT.IoTMonitor)
    IoT: IoT;

    constructor() {
        if (this.id === undefined) {
            this.id = uuidv4();
        }
    }
}