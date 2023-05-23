const creatAccount =async (name:string,age:number) => {

    const fullName = name + age;

    return fullName
    
}

const getName:string = creatAccount(mulika,2)

console.log(getName)