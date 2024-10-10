import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../Item/Item";
import { Orders } from "../Orders/Orders";


@Entity("OrderAndItems")
export class OrderAndItems {

    @PrimaryColumn()
    id: string

    @Column()
    type: string
    @Column()
    name: string
    @Column()
    unitMeasurement: string
    @Column()
    quantity: number
    @Column()
    price: number
    @Column()
    discount: number
    @CreateDateColumn()
    createdAt: Date
    @Column({default:false})
    deleted: boolean
    @CreateDateColumn()
    updated: Date

    // @ManyToOne( () => Item, (item)=> item.orderAndItems)
    // @JoinColumn({name:"itemId"})
    // item: Item

    @ManyToOne( ()=> Orders, (orders)=> orders.orderAndItem)
    @JoinColumn({name:"ordersId"})
    orders: Orders

    
    constructor() {
        if (this.id === undefined) {
            this.id = uuidv4();
        }
    }
}