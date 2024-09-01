import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Car } from "../Car/Car";
import { User } from "../User/User";
import { OrderAndItem } from "../OrderAndItem/OrderAndItem";

@Entity("Order")
export class Order
{
    @PrimaryColumn()
    @Column()
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
    @Column({default:false})
    deleted: Boolean
    @CreateDateColumn()
    updated: Date

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({name:"userId"})
    user: User

    @ManyToOne(() => Car, (car) => car.order)
    @JoinColumn({name:"carId"})
    car: Car

    @OneToMany(()=>OrderAndItem, (orderAndItem)=> orderAndItem.order)
    orderAndItem: OrderAndItem[]
  
    constructor()
    {
        if(!this.id)
        {
            this.id = uuidv4();
        }
    }
}