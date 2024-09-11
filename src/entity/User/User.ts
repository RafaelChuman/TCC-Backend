import { v4 as uuidV4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Car } from "../Car/Car";
import { Orders } from "../Orders/Orders";

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
    cellphone: string
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

    @OneToMany(() => Orders, (orders) => orders.user)
    orders: Orders[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.isAdmin = false;
        }
    }

    public toString = () : string => {
        return `User (id: ${this.id}, name: ${this.name}))`;
    }
}



// @OneToMany(()=> Group, (group) => group.User)
// Group: Group[]

// @OneToMany(()=> RescueGroup, (rescueGroup) => rescueGroup.User)
// RescueGroup: RescueGroup[]