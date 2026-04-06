function analyze(){
    const file = document.getElementById("audioInput").files[0];

    if(!file){
        alert("Upload audio first");
        return;
    }

    const score = Math.floor(Math.random()*40)+60;

    let feedback = "";

    if(score > 85){
        feedback = "Excellent recitation";
    } else if(score > 70){
        feedback = "Good, improve tajweed";
    } else {
        feedback = "Needs practice";
    }

    document.getElementById("result").innerText =
        "Score: " + score + "% - " + feedback;
}