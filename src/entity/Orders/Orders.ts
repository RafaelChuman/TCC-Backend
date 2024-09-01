import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Car } from "../Car/Car";
import { User } from "../User/User";
import { OrderAndItems } from "../OrderAndItems/OrderAndItems";

@Entity("Orders")
export class Orders {
    @PrimaryColumn()
    id: string
    @Column()
    km: number
    @Column()
    fuel: number
    @Column()
    statusExecution: string
    @Column()
    statusOrder: Boolean
    @CreateDateColumn()
    createdAt: Date
    @Column({ default: false })
    deleted: Boolean
    @CreateDateColumn()
    updated: Date

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: "userId" })
    user: User

    @ManyToOne(() => Car, (car) => car.orders)
    @JoinColumn({ name: "carId" })
    car: Car

    @OneToMany(() => OrderAndItems, (orderAndItems) => orderAndItems.orders)
    orderAndItem: OrderAndItems[]

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}