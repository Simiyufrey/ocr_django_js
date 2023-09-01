$(document).ready(()=>{
    $.ajaxSetup({
        headers: {
          'X-CSRFToken': $('[name=csrfmiddlewaretoken]').val(),
        }
      });

    let facing_mode="environment"  //default facing mode

    var videoElement=document.getElementById("video")

    const start_camera = (facingMode) => {
       
        if (facingMode === "user"){
            navigator.mediaDevices.getUserMedia({ video: { facingMode:facingMode } }).then((stream)=>{
                videoElement.srcObject = stream;
        
            }).catch(()=>{
                console.log("error")
                alert(error)
            })}
        else {
            navigator.mediaDevices.getUserMedia({ video: { facingMode:facingMode } }).then((stream)=>{
                videoElement.srcObject = stream;
        
            }).catch((error)=>{
                console.log(error)
            })}
            
        }
     
    
    $("#switch").on("click", () => {
    if (facing_mode === "user") {
        facing_mode = "environment";
    } else {
        facing_mode = "user";
    }
    
    start_camera(facing_mode)
    });
  
    start_camera(facing_mode)


    $("#capture").on("click",()=>{
        var canvas=document.querySelector("#photo")

        canvas.width=videoElement.videoWidth
        canvas.height=videoElement.videoHeight
        var canvascontext=canvas.getContext("2d")
        canvascontext.drawImage(videoElement,0,0,canvas.width,canvas.height)


        var data_url=canvas.toDataURL("image/jpeg")
    
        var formdata=new FormData()
        formdata.append("image",data_url)
        
        rotate_spinner()
        $.ajax({
            type:"post",
            url:"/process-data",
            data:formdata,
            processData:false,
            contentType:false,
            success:(data)=>{
                if (data['success']){
                    $("#data").text(data['data'])

                    setTimeout(()=>{
                        clearInterval(rotate_spinner())

                    },1000)
                }
                else{
                    $("#data").text(data['message'])
                    setTimeout(()=>{
                        clearInterval(rotate_spinner())

                    },1000)
               }
    
            },error:(error)=>{
                clearInterval(rotate_spinner())
                
            }
        })
       
    })


    $("#photo_toggle").on("click",()=>{
        $(".photo-wrapper").toggleClass("d-none")

    })

    $("#modal1").on("hidden.bs.modal",()=>{
        $("#data").text("Validating data")
    })

})

capture_image=(canvas)=>{
    canvas.width=videoElement.videoWidth
    canvas.height=videoElement.videoHeight
    var canvascontext=canvas.getContext("2d")
    canvascontext.drawImage(videoElement,0,0,canvas.width,canvas.height)

  
}
      

function draw_canvas(){

    
    var canvascontext=canvas.getContext("2d")

    canvascontext.drawImage(videoElement,0,0,canvas.width,canvas.height)
    

}

rotate_spinner=()=>{
    index=1
    content="."
    $("#modal1").modal('toggle')
   const interval= setInterval(()=>{
        var angle=90*index
       if (index % 4 ==0){
        content=""
       }
       else{
        content=content+"."
       }
       $(".spinner").text(content)
        index=index+1
    },100)
   return interval
}








  
