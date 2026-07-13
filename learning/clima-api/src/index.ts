const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

async function chamarApi(){
    try{
        const resp = await fetch(URL);
        const dados = await resp.json()
        console.log(dados.current.temperature_2m);
    }catch(erro){
        console.log(erro); //desenvolvedor
        console.log("Não foi possível obter os dados do clima. Tente novamente mais tarde."); // usuário final
    }
    
}

chamarApi();