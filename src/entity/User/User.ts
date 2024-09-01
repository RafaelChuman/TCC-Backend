import { v4 as uuidV4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Car } from "../Car/Car";
import { Order } from "../Order/Order";

@Entity("User")
export class User {

    @PrimaryColumn()
    id: string
    @Column()
    name: string
    @Column()
    userName: string
    @Column()
    password: string
    @Column()
    imgPath: string
    @Column()
    email: string
    @Column()
    cellphone: number
    @Column()
    telegram: string
    @Column()
    isAdmin: boolean
    @CreateDateColumn()
    createdAt: Date
    @Column({default:false})
    deleted: boolean
    @CreateDateColumn()
    updated: Date

    @OneToMany(() => Car, (car) => car.user)
    car: Car[];

    @OneToMany(() => Order, (order) => order.user)
    order: Order[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.isAdmin = false;
        }
    }
}



// @OneToMany(()=> Group, (group) => group.User)
// Group: Group[]

// @OneToMany(()=> RescueGroup, (rescueGroup) => rescueGroup.User)
// RescueGroup: RescueGroup[]