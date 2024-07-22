import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Group } from "../Group/Group";
import { IoTMonitor} from "../IoTMonitor/IoTMonitor";


@Entity("IoT")
export class IoT {

    @PrimaryColumn()
    id: string

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Group, (group) => group.IoT)
    Group: Group;

    // @OneToMany(() => LubrificationSystemServices, (lubricationSystemServices) => lubricationSystemServices.er)
    // lubrificationSystemServices: LubrificationSystemServices[];

    @OneToMany(() => IoTMonitor, (ioTMonitor) => ioTMonitor.IoT)
    IoTMonitor: IoTMonitor[];


    constructor() {
        if (this.id === undefined) {
            this.id = uuidv4();
        }
    }
}