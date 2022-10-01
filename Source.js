// Listen for tab updates and update the icon to reflect the new state of the tab Main*******
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if ('audible' in changeInfo) {
      setIconFromAudible(changeInfo.audible);
    }
  });
  
  
  
  // Update icon based on audible state
  function setIconFromAudible(is_audible, tabId) {
    let path = is_audible;  
    
    if (path == true) {
      docashdatess();
    }
    
    if (path === false) {
      domute(); 
    }
    
  }

///////////////////Cash date check for Unmute//////////
function docashdatess(){
  chrome.storage.local.get(['keydate'], function(result) {
  
    var Currentdate = new Date().toLocaleDateString();
     var Cleardate= result.keydate;
    
     if(Currentdate==Cleardate){
      dofinshedcampcheck();
     }
  else{
    domute();
  
  }
    })
  }
  
///////////Finished Campagin check///////////
function dofinshedcampcheck(){
  chrome.storage.local.get(['campid'], function(result) {
    var campid = result.campid;
    chrome.storage.local.get(['keyFinishedID'], function(result) {
      if(campid !== undefined){
      var AllFinishedID = result.keyFinishedID;
      var Fcampresult = AllFinishedID.search(campid);
      if(Fcampresult==-1){
        dounmute();
      }
    else{
      doerror();
    }

    }
    console.log(campid)
  }) 
  });
}  
//////////////////Send DO UNMUTE/////////////////
function dounmute(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let curl = tabs[0].url;
    chrome.storage.local.get(['campurl'], function(result) {
        var campurl = result.campurl;
    
    if(curl==campurl){
        console.log("Play");
        dostart();
   chrome.storage.local.set({VideoCode: curl});
   chrome.storage.local.set({VideoStatus: "Play"});
   doredicoset();
      }


    })
})
  }
  
  //////////////////Send DO MUTE/////////////////
  function domute(){

    console.log("Puse");
    clearInterval(timers);
    chrome.storage.local.set({VideoStatus: "Puse"});
    doblueicoset();
  }
  
 //////////////////Send DO MUTE/////////////////
 function doerror(){

  console.log("Browser Error");
  clearInterval(timers);
  chrome.storage.local.set({VideoStatus: "Browser Error"});
}

///////////////////Campaign Process Time Check /////////

var timers;

function countDown(i, callback) {
  timers = setInterval(function() {
  if(i <= 0){
    (clearInterval(timers), callback());
  }
  else {
    chrome.storage.local.set({camptime: i});
  }
      i -= 1 
  }, 1000);
}


function dostart(){

    chrome.storage.local.get(['camptime'], function(result) {
        var camptime = result.camptime;
    

var tam = camptime;


  countDown(tam, function(){
    compliteall();

}); 
});
}  


////////////////////Complite Campaign///////////////  
function compliteall(){
    clearInterval(timers);
    ////////////////Send Campaign finished Data////////////
    chrome.storage.local.get(['campid'], function(result) {
      var campid= result.campid;  
    chrome.storage.local.get(['keyversion'], function(result) {
      var Versionss= result.keyversion;
      chrome.storage.local.get(['VideoCode'], function(result) {
        var VideoCode= result.VideoCode;    
chrome.runtime.onMessageExternal.addListener(function(request, sender, respond) {
        respond({Campid: campid, Version: Versionss, SecretCode: "udytt78", VideoCode: VideoCode})
      
        
        chrome.storage.local.set({campid: 0});
        chrome.storage.local.set({campurl: 0});
        chrome.storage.local.set({campthumbnail: 0});
        chrome.storage.local.set({campchannel: 0});
        chrome.storage.local.set({camptitle: 0});
        chrome.storage.local.set({VideoStatus: "Puse"});

        chrome.runtime.reload();
      
      })
      })
    })
  ///////////////////Campaign finished ID store///////
  chrome.storage.local.get(['keyFinishedID'], function(result) {
    var AllFinishedID = result.keyFinishedID;
    var AllCFID = AllFinishedID+campid;
      chrome.storage.local.set({keyFinishedID: AllCFID});
     console.log(AllCFID);
    }) 

    })
///////////////New tab open////////////
action_url = "https://www.tubebull.xyz/campaignprocess";
chrome.tabs.create({ url: action_url});

     }

//////////////If Tab id link chinge//////////////////////////

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let curl = tabs[0].url;
   if(curl=="https://www.tubebull.xyz/index"){
    console.log(curl);
   donewextensioninstall();
  }
  })
  domute();
}
});



/////////////If Tab iD removed//////////

chrome.tabs.onRemoved.addListener(function(tabid, removed) {
  domute();
})

///////////////Camp id All Data recive///////////////
  chrome.runtime.onMessageExternal.addListener( 
    function(request, sender, sendResponse) {
      var campid = request.campid;
      var campurl = request.campurl;
      var camptime = request.camptime;
      var campthumbnail = request.campthumbnail;
      var campchannel = request.campchannel;
      var camptitle = request.camptitle;
      var camprecive = request.camprecive;
    ///////////////Camp Start//////////////   
       if(camprecive=="CampStart"){
        chrome.storage.local.set({campid: campid});
        chrome.storage.local.set({campurl: campurl});
        chrome.storage.local.set({camptime: camptime});
        chrome.storage.local.set({campthumbnail: campthumbnail});
        chrome.storage.local.set({campchannel: campchannel});
        chrome.storage.local.set({camptitle: camptitle});
// Close all other tabs except the current one
       chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0].id;
        doStabclose(tab);
        console.log(tab);
      });
    }
/*/////////////////Camp Finished////////////////
if(camprecive=="CampFinished"){
///////////////New tab open////////////
action_url = "https://www.ytgrow.xyz/p/index.html";
chrome.tabs.create({ url: action_url});
      chrome.runtime.reload();
}/*/
  });

//////////Start Close All Tab///////
  function doStabclose(tab){
    chrome.tabs.query({}, function (tabs) {
     var tabId = tab;
     console.log(tabId);
     for (var i = 0; i < tabs.length; i++) {
       if(tabs[i].id != tabId && !tabs[i].pinned){
         chrome.tabs.remove(tabs[i].id);
         chrome.runtime.reload();
       }
     }
 });
} 


/*/////////Finished Close Tab///////
function doFtabclose(tab){
  chrome.tabs.query({}, function (tabs) {
   var tabId = tab;
   console.log(tabId);
   for (var i = 0; i < tabs.length; i++) {
     if(tabs[i].id != tabId && !tabs[i].pinned){
       chrome.tabs.remove(tabs[i].id);
         
     }
   }
});
} 
/*/

//////////////Cash Date Check for Bandge/////////////////
chrome.storage.local.get(['keydate'], function(result) {

  var Currentdate = new Date().toLocaleDateString();
   var Cleardate= result.keydate;
  
   if(Currentdate==Cleardate){
    doblueicoset();
   }
  
   else{
  
    doredicoset();
    
   }
  
  
  });

////////////////Do Blue Icon set////////////
function doblueicoset(){
chrome.action.setIcon({ 
  path: {
    
     '16': `images/16_m_blue.png`,
      '48': `images/48_m_blue.png`,
      '128': `images/128_m_blue.png`,    
  }
  });
}

//////////////Do Red icon set//////////////
function doredicoset(){
  chrome.action.setIcon({ 
    path: {
      
       '16': `images/16_m_red.png`,
        '48': `images/48_m_red.png`,
        '128': `images/128_m_red.png`,    
    }
    });

}


//////////////////Extension new Install/////////
chrome.storage.local.get(['keyEXtensionNew'], function(result) {
  var NewExtensionID = result.keyEXtensionNew;
  if(NewExtensionID==undefined){
    var NewExID = (new Date()).getTime();
    chrome.storage.local.set({keyEXtensionNew: NewExID});
  console.log(NewExID)
  }
})

///////////Send Extension Id//////////////
function donewextensioninstall(){
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: SendToExtensionNew
    });
  });
}
function SendToExtensionNew(){
    chrome.runtime.sendMessage({greeting: "Redy"}, function(response) {
      chrome.storage.local.get(['keyEXtensionNew'], function(result) {
        let NewExID = result.keyEXtensionNew;
      document.getElementById('id_ExtensionNew').value = NewExID;
      const element = document.getElementById('id_ExtensionNew');  
      const event = new Event('change');  
      element.dispatchEvent(event);
    })
  });
}

//
  ////Set source Version///////////////
  chrome.storage.local.get(['Serversource'], function(result) {
    var Serversource = result.Serversource;
    if(Serversource==undefined){
  chrome.storage.local.set({Localsource: 10});
    }
  });

  // Redirect users to a form when the extension is uninstalled.
const uninstallListener = (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL('https://www.tubebull.xyz/extension-uninstall');
  }

  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // TODO: show changelog
  }
};
chrome.runtime.onInstalled.addListener(uninstallListener);


////////////////////Relod Extension Check Video Stutas/////////

  chrome.storage.local.get(['VideoStatus'], function(result) {
    var VideoStatus= result.VideoStatus;   

    if(VideoStatus=="Play"){

      dounmute();

    }
else{
  domute();

}
  })
 

 /*/
 chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "hello")
      sendResponse({farewell: "goodbye"});
  }
);/*/
///////////////Persistent Service Worker  active ////

let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();

////////////////////Relod Extension Check Video Stutas/////////
chrome.storage.local.get(['VideoStatus'], function(result) {
  var VideoStatus= result.VideoStatus;   

  if(VideoStatus=="Play"){

    chrome.runtime.reload();

  }
})  
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}
