function p1() {
    return '1'
}

function p2() {
    return '2'
}

function p3() {
    return '3'
}
async function fn() {

    let a = await p1();
    let b = await p2();
    let c = await p3();
    console.log(a);
    console.log(c);
    console.log(b);

}
fn();