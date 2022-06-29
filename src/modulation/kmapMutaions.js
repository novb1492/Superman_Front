export default {
    setMap(state,data){
        console.log(data);
        state.map=new window.kakao.maps.Map(data.container, data.options); 
    }

}