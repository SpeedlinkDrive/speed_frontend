


  //GET SPEEDLINK GOOGLE_ACCESS TOKEN TO UPLOAD TO SPEEDLINK DRIVE
  async function speedlinkAccess() {

    let settings = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access')}`,
      },
    };
    try {
      let fetchResponses = await fetch(`${backendUrl}/api/google/speedlinkaccess`, settings);
      let staus = await fetchResponses.status
      let res = await fetchResponses.json();

      if (res.error == 1) {

      } else if (res.error == 2) {
        window.location.href = `${baseUrl}/auth/signin`
      } else if (res.success == 1) {
        console.log(res.token)
        localStorage.setItem('default_goog_acc', res.token) // google default accesstokend to upload to speedlink drive
        window.location.href = `${baseUrl}/create.html`
      } else {
        console.log('something is wrong')
      }


    }
    catch (err) {
      console.log('internet error')
      console.log(err)
    }
  }


  async function myStorage() {

    localStorage.setItem('temp_mystore', true) // set a temporary storage which will be used to know the user clicked this option
    // window.location.href = `${backendUrl}/api/google/auth` // prompt 

    let settings = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access')}`,
      },
    };
    try {
      let fetchResponses = await fetch(`${backendUrl}/api/google/mystorage`, settings);
      let staus = await fetchResponses.status
      let res = await fetchResponses.json();

      if (res.error == 1) {

      } else if (res.error == 2) {
        window.location.href = `${baseUrl}/auth/signin`
      } else if (res.success == 1) {
        console.log(res.token)
        localStorage.setItem('my_goog_acc', res.token) // google access token for users second time
        window.location.href = `${baseUrl}/create.html`
      } else {
        console.log('something is wrong')
      }


    }
    catch (err) {
      console.log('internet error')
      console.log(err)
    }
  }


  async function newStorage() {

    localStorage.setItem('temp_newstore', 1) // set a temporary storage which will be used to know the user clicked this option
    window.location.href = `${backendUrl}/api/google/auth/${localStorage.getItem('access')}` // prompt 

    //myStorage()
    /* let settings = {
       method: 'GET',
       headers: {
         "Authorization": `Bearer ${localStorage.getItem('access')}`,
       },
     };
     try {
       let fetchResponses = await fetch(`${backendUrl}/api/google/newstorage`, settings);
       let staus = await fetchResponses.status
       let res = await fetchResponses.json();
    
       if(res.error == 1){
 
       }else if(res.error == 2){
         window.location.href = `http://127.0.0.1:5502/dist/auth/signin.html`
       }else if(res.success == 1){
         console.log(res.token)
         localStorage.setItem('new_goog_acc', res.token) // google new access tokenfor the users first time
         window.location.href = '${baseUrl}create.html'
       }else{
         console.log('something is wrong')
       }
    
 
     }
     catch (err) {
       console.log('internet error')
       console.log(err)
     } */
  }





  if (localStorage.getItem('temp_newstore') == 1) {
    localStorage.setItem('temp_newstore', 0)
    let url_params = new URLSearchParams(window.location.search)
    console.log(url_params.get('scope'))
    console.log(url_params.get('code'))
    console.log(url_params.get('prompt'))
    console.log(url_params.get('authuser'))

    async function sendData() {
      let settings = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          scope: url_params.get('scope'),
          code: url_params.get('code'),
          prompt: url_params.get('prompt'),
          authuser: url_params.get('authuser'),
        })
      };
      try {
        let fetchResponses = await fetch(`${backendUrl}/api/google/newstorage`, settings);
        let staus = await fetchResponses.status
        let res = await fetchResponses.json();

        if (res.error == 1) {

        } else if (res.error == 2) {
          window.location.href = `${baseUrl}/auth/signin`
        } else if (res.success == 1) {
          //alert('success')
          console.log(res.token)
          localStorage.setItem('my_goog_acc', res.token) // google access token for users second time
          window.location.href = `${baseUrl}/create.html`
        } else {
          console.log('something is wrong')
        }


      }
      catch (err) {
        console.log('internet error')
        console.log(err)
      }
    }
    // myStorage()
    sendData()
  } else {

    //   alert(localStorage.getItem('temp_newstore'))
  }



// GET LIS OFALL RECORDS 

  async function getRecordList() {
    //alert('working')
    let settings = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access')}`,
      }
    };
    try {
      let fetchResponses = await fetch(`${backendUrl}/api/app/getrecords`, settings);
      let staus = await fetchResponses.status
      let res = await fetchResponses.json();

      if (res.error == 1) {
        ('wrong 1')
      } else if (res.error == 2) {
        //alert('wrong 2')
        window.location.href = `${baseUrl}/auth/signin`
      } else if (res.success == 1 && staus == 200) {
        console.log(res.data)

        if (res.data != '') {
          let data = res.data
          $('#display').html('') // EMPTY THE HTML DISPLAY HOLDER
          data.forEach(rez => {
            console.log(rez)
            $('#display').append(
            /*html*/
              `
           <tr class="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
           <td class="whitespace-nowrap px-4 py-3 sm:px-5">
             <div class="flex items-center space-x-4">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-8 w-8 text-secondary"
                 viewbox="0 0 20 20"
                 fill="currentColor"
               >
                 <path
                   d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                 />
               </svg>
               <span class="font-medium text-slate-700 dark:text-navy-100">Media</span
               >
             </div>
           </td>
           <td class="whitespace-nowrap px-4 py-3 sm:px-5">
             ${rez.created_at}2 hour ago
           </td>
           <td
             class="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-navy-100 sm:px-5"
           >
            ${(rez.file_size) / (1024 * 1024)} MB
           </td>
           <td class="whitespace-nowrap px-4 py-3 sm:px-5">
            <div class="flex -space-x-2">
              <div>Firstname Lastname</div>
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-3 sm:px-5">
            <div class="flex -space-x-2">
              <div class="avatar h-7 w-7 hover:z-10">
                <div
                  class="is-initial rounded-full bg-error text-xs+ uppercase text-white ring ring-white dark:ring-navy-700"
                >
                  nd
                </div>
              </div>
            </div>
          </td>
         </tr>
   
           `

            )

          })

        }else{
            $('#display').html('') // set diaplay to empty
            $('#display').append(
                /*html*/
                  `
               <div class="border-y border-transparent border-b-slate-200 dark:border-b-navy-500 absolute w-[100%]">
                <div class="whitespace-nowrap px-4 py-3 sm:px-5 w-[100%] border dark:border-navy-500">
                    <div class="flex items-center space-x-4 justify-center">
                       
                        <span class="font-medium text-slate-700 dark:text-navy-200">No Record Yet</span>
                    </div>
                </div>
               </div>
               `
               )
        }

      } else {
        console.log('something is wrong')
      }


    }
    catch (err) {
      console.log('internet error')
      console.log(err)
    }
  }
  getRecordList()