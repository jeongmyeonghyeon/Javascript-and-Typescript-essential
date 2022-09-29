function add(x: number, y: number): number {
    return x + y;
}

type ObjType ={
    x: number;
    y: number;
}
const json = `{"x":"abc", "y":20}`;
const obj= JSON.parse(json) as ObjType;
add(10, 20);

add(obj.x, obj.y)

