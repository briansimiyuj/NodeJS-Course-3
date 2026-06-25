import { format }  from "date-fns"
import { v4 as uuidv4 } from "uuid"

console.log(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"))

console.log(uuidv4())