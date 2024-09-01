import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../Order/Order";
import { User } from "../User/User";

@Entity("Car")
export class Car {

    @PrimaryColumn()
    id: string
    @Column()
    brand: string
    @Column()
    model: string
    @Column()
    kind: string
    @Column()
    type: string
    @Column()
    plate: string
    @Column()
    yearOfFabrication: number
    @Column()
    yearOfModel: number
    @Column()
    color: string
    @CreateDateColumn()
    createdAt: Date
    @Column({default:false})
    deleted: boolean
    @CreateDateColumn()
    updated: Date

    @ManyToOne(() => User, (usr) => usr.car)
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => Order, (order) => order.car)
    order: Order[]

    constructor() {
        if (this.id === undefined) {
            this.id = uuidv4();
        }
    }
}





// @ManyToOne(() => Group, (group) => group.IoT)
// Group: Group;

// @OneToMany(() => LubrificationSystemServices, (lubricationSystemServices) => lubricationSystemServices.er)
// lubrificationSystemServices: LubrificationSystemServices[];

// @OneToMany(() => IoTMonitor, (ioTMonitor) => ioTMonitor.IoT)
// IoTMonitor: IoTMonitor[];
