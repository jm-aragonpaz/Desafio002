const { constants } = require("buffer");
const fs = require("fs")

class Contenedor {
    constructor(File) {
        this.file = File;
    }

    async save(product){
        try {
            console.log(this.file)
            product.id = this.id++
            const data = await fs.promises.readFile(this.file, 'utf-8')
            console.log(data)
            const items = JSON.parse(data);
            let idProd=0
            if (items.length > 0){
                let products=[];
                items.forEach(el => {
                    products.push(el.id)
                } )
                idProd=Math.max(...products);
            }
            idProd++
            const newProduct={...product,id:idProd};
            const newItems=[...items, newProduct];
            const newItemsStr=JSON.stringify(newItems)
            await fs.promises.writeFile(this.file, newItemsStr)
            return idProd;    
        } catch (error) {
            console.log(error)
        }
        
    }


//Recibe un id y devuelve el objeto con ese id o null si no esta
async getById(id){
    try {
        const data = await fs.promises.readFile(this.file,'utf-8');
        const items = JSON.parse(data);
        const product = items.find(e=>e.id===id);
        return product
    } catch (error) {
        console.log(error)
    }


}
//Array con todos los objetos del archivo
async getAll(){
    try {
        const data = await fs.promises.readFile(this.file,'utf-8');
        const products = JSON.parse(JSON.stringify(data));
        return products
    } catch (error) {
        console.log(error);
    }

}
//Elimina el archivo con el id buscado
async deleteById(id){
    try{
    const data = await fs.promises.readFile(this.file,'utf-8')
    const items = JSON.parse(data);
    const product = items.filter((e)=> e.id != id);
    const productStr = JSON.stringify(product);
        // items.splice(items.indexOf(product),1)
        // console.log(items)
    await fs.promises.writeFile(this.file, productStr)
    }catch(error){
        return console.log('Producto no encontrado')
    }

}
//eliminar todos los objetos en el archivo
async deleteAll(){
    try {
        const products=[]
        const productStr=JSON.stringify(products)
        await fs.promises.writeFile(this.file, productStr)
    } catch (error) {
        console.log(error)
    }

}
}


const contenedor=new Contenedor('productos.txt')
// contenedor.save(    {                                                                                                                                                    
//     "title": "Escuadra",                                                                                                                              
//     "price": 123.45,                                                                                                                                     
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",                                                                                                                                                                                      
//   }).then((res)=>console.log(res));

//   contenedor.save(    {                                                                                                                                                    
//     "title": "Calculadora",                                                                                                                              
//     "price": 234.56,                                                                                                                                     
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                                                                                                                                                                      
//   }).then((res)=>console.log(res));

// contenedor.save(    {                                                                                                                                                    
//     "title": "Globo Terraqueo",                                                                                                                              
//     "price": 345.67,                                                                                                                                     
//     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",                                                                                                                                                                                      
//     }).then((res)=>console.log(res));


// contenedor.getAll().then((res) => console.log(res))

contenedor.getById(3).then((res)=>console.log(res));
// contenedor.deleteById(2);
// contenedor.deleteAll();