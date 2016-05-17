//Javascript websocket client that talks with a java based server that communicates with ACTR
//Handles getting data on an interval and sending it to the server in a specific format, and will handle
//calls back from the ACTR that specify things ACTR has done ie click mouse or press button.

//Brad Reynolds

//MODEL COMMANDS GO HERE
var modelCommands = []; //Insert Lisp commands here.

var screenObjects;
setTimeout(function(){

           screenObjects = [
                               //  {type : "DiagonalLine", id : "specialLine", color:"red", change : "static"},
                            
                            //screen object declaration here. specification in documentation.
                            
                            
                            //{type : "Line", id : "line1", width: 10, change : "static"}, //Newer inline styles in chrome.
                            
                            
                            //{type : "Line", id : "line2", width: 10, change : "static"},
                            
                            
                            //{type : "Line", id : "line3", width: 10, change : "static"}, //Newer inline styles in chrome.
                            

                            {type : "Oval", id : "point10", color:"green", change : "static"},
                            

                            {type : "Oval", id : "point11", color:"green", change : "static"}, //Newer inline styles in chrome.
                            
                            
                            {type : "Oval", id : "point12", color:"green", change : "static"},
                            
                            
                            {type : "Oval", id : "point13", color:"green", change : "static"},
                            
                            
                            {type : "Oval", id : "point14", color:"green", change : "static"},
                            
                            
                            {type : "Oval", id : "point15", color:"green", change : "static"},

                            
                            //{type : "Line", id : "line0", change : "static", color : "green"},
                            
                            
                            {type : "Label", id : "label0", color:"black", change : "static"},
                            
                            
                            {type : "Label", id : "label1", color:"black",change : "static"},
                            
                            
                            {type : "Label", id : "label2", color:"black", change : "static"},
                            
                            
                            {type: "Label", id: "labeltitle0",color: "black",change: "static"},
                            
                            
                            {type : "Rectangle", id : "rectangle0", change : "static"},
                            
                            
                            {type : "Rectangle", id : "rectangle1", change : "static"},
                            
                            
                            {type : "Rectangle", id : "rectangle2", change : "static"},
                            
                            
                            //  {type : "Line", id : "xaxis", change : "static", color : "black"},
                            
                            
                            //  {type : "Line", id : "yaxis", change : "static", color : "black"},
                            
                            
                            
                            
                            
                            {type : "Label", id : "xians0",  change : "static"},
                            
                            
                            {type : "Label", id : "xians1", change : "static"},
                            
                            
                            {type : "Label", id : "xians2", change : "static"},
                            
                            
                            {type : "Label", id : "xians3",  change : "static"},
                            
                            
                            {type : "Label", id : "xians4", change : "static"},
                            
                            
                            {type : "Label", id : "xians5",  change : "static"},
                            
                            
                            
                            
                            
                            {type : "Label", id : "yams0", change : "static"},
                            
                            
                            {type : "Label", id : "yams1", change : "static"},
                            
                            
                            {type : "Label", id : "yams2", change : "static"},
                            
                            
                            {type : "Label", id : "yams3", change : "static"},
                            
                            
                            {type : "Label", id : "yams4", change : "static"},
                            
                            
                            
                            
                            
                            {type : "Line", id : "xline0",  change : "static"},
                            
                            
                            {type : "Line", id : "xline1", change : "static"},
                            
                            
                            {type : "Line", id : "xline2", change : "static"},
                            
                            
                            {type : "Line", id : "xline3",  change : "static"},
                            
                            
                            {type : "Line", id : "xline4", change : "static"},
                            
                            
                            {type : "Line", id : "xline5",  change : "static"},
                            
                            
                            
                            
                            
                            {type : "Line", id : "yline0", change : "static"},
                            
                            
                            {type : "Line", id : "yline1", change : "static"},
                            
                            
                            {type : "Line", id : "yline2", change : "static"},
                            
                            
                            {type : "Line", id : "yline3", change : "static"},
                            
                            
                            {type : "Line", id : "yline4", change : "static"},
                            
                            
                            
                            
                            
                            //{type : "Line", id : "xis", change : "static"},
                            
                            
                            //{type : "Line", id : "yis", change : "static"},
                            
                            
                            


                            {type : "Oval", id : "point20", color:"orange", change : "static"},
                            

                            {type : "Oval", id : "point21", color:"orange", change : "static"},


                            {type : "Oval", id : "point22", color:"orange", change : "static"}, //Newer inline styles in chrome.


                            {type : "Oval", id : "point23", color:"orange", change : "static"},


                            {type : "Oval", id : "point24", color:"orange", change : "static"},


                            {type : "Oval", id : "point25", color:"orange", change : "static"},





                            //{type : "Line", id : "line1", change : "static", color : "orange"},


                            {type : "Oval", id : "point30", color:"red", change : "static"},


                            {type : "Oval", id : "point31", color:"red", change : "static"},


                            {type : "Oval", id : "point32", color:"red", change : "static"}, //Newer inline styles in chrome.


                            {type : "Oval", id : "point33", color:"red", change : "static"},


                            {type : "Oval", id : "point34", color:"red", change : "static"},


                            {type : "Oval", id : "point35", color:"red", change : "static"},


                            //{type : "Line", id : "line2", change : "static", color : "red"}
                            
                            


                             
                             {type : "DiagonalLine", id : "line00", color:"green", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line01", color:"green", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line02", color:"green", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line03", color:"green", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line04", color:"green", change : "static"},
                             


                            
                            
                            {type : "DiagonalLine", id : "line1000", color:"orange", change : "static"},
                            
                            

                             

                             {type : "DiagonalLine", id : "line11", color:"orange", change : "static"},


                             {type : "DiagonalLine", id : "line12", color:"orange", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line13", color:"orange", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line14", color:"orange", change : "static"},
                             
                             
                             
                             
                             
                             {type : "DiagonalLine", id : "line20", color:"red", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line21", color:"red", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line22", color:"red", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line23", color:"red", change : "static"},
                             
                             
                             {type : "DiagonalLine", id : "line24", color:"red", change : "static"},
                             
                             
                            
                            {type : "Line", id : "yaxisline",  change : "static"},
                            
                            
                            {type : "Line", id : "xaxisline",  change : "static"},
                            
                            
                            
                            
                            
                            
                            
                            
                            ];

},1);




//////////////////////////////////////////////////
//////////DEBUGGING AND DATA RECORDING SETTINGS///
//////////////////////////////////////////////////
var debugServerInitMsgs = false; // Prints init msg server side
var debugServerUpdateMsgs = false; //Prints update msgs server side (You will be spammed)
var debugInitMSG = false; //Client-side. Prints the objects you are sending.
var debugUpdateMSG = false; //Client-side. Debugs each update MSG. Will be spammed with large amount of msgs. I find this useful when a improperly declared item is breaking things, this helps show which.
var onlyUpdateInit = false; //This disallows sync command from going through. This means the original screen information will be presented and not changed.
var recordActrLogFile = false; //Saves model data and information to a log file

///////////////////////////////////////////////////////////
//////////Server connection and interpretation settings////
///////////////////////////////////////////////////////////
var defaultThickness = 2; //No way to get thickness of lines currently - would be through CSS, used in rectangle and 2 color objects
var lineWidth = 1; //Used when a line doesn't have a specified thickness via stroke-width and its BoundingBox still has 0 for height/width
var refreshRate = 16.6666666666; //60 per seconds Can modify if wanted slow or faster
var ws = new WebSocket("ws://localhost:9003/"); //Location/Port ACTR server running on, don't change unless server is changed

///////////////////////////////////////////////////////////////////////
//////////Important values, don't change without solid understanding///
///////////////////////////////////////////////////////////////////////
var requestCounter = 1; //Counter for requests sent. Incremented each time msg is sent
var myDate = new Date(); //Initial date - used to get time since sync for determining order
var dynamicPolling = new Array(); //List of polling updating items
var dynamicEvent = new Array(); //List of dynamicUpdating items



//  Place code to ready ACT-R commands to be sent at the start of model execution here
var readyCommands = function(){

}


function stateChange(newState) {
    setTimeout(function(){
        if(newState == -1){alert('VIDEO HAS STOPPED');}
    }, 5000);
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////Core Websocket activity here
////////////////////////////////////////////////

//When connection is established. Adds all items to init array and sends that to the server.
ws.onopen = function() {

    wait(7000);
    console.log("Opened connection with ACT-R server")
    var intialArray = new Array();

    //var s0 = getObjectXYHW("chart0");
    //console.log(s0.x,s0.y + (s0.height / 2),s0.width);

    //intialArray.push({id:"chart0", type:"Rectangle", color:"steelblue", x:s0.x,y:s0.y + (s0.height / 2),width:s0.width, height: 1});

    //var s0 = getObjectXYHW("chart1");

    //console.log(s0.x,s0.y + (s0.height / 2),s0.width);

    //intialArray.push({id:"chart1", type:"Rectangle", color:"steelblue", x:s0.x,y:s0.y + (s0.height / 2),width:s0.width, height: 1});

    //var s0 = getObjectXYHW("chart2");
    //intialArray.push({id:"chart2", type:"Rectangle", color:"steelblue", x:s0.x,y:s0.y + (s0.height / 2),width:s0.width, height: 1});

    //var s0 = getObjectXYHW("chart3");
    //intialArray.push({id:"chart3", type:"Rectangle", color:"steelblue", x:s0.x,y:s0.y + (s0.height / 2),width:s0.width, height: 1});

    //var s0 = getObjectXYHW("chart4");
    //intialArray.push({id:"chart4", type:"Rectangle", color:"steelblue", x:s0.x,y:s0.y + (s0.height / 2),width:s0.width, height: 1});

    //var s0 = getObjectXYHW("chart5");
    //intialArray.push({id:"chart5", type:"Rectangle", color:"steelblue", x:s0.x,y:s0.y + (s0.height / 2),width:s0.width, height: 1});


    //If you wanted to manually specify an object for some reason do that here. IE objects not in page.
    //Not in webpage object declaration would look like {id: "itemID", width: 22, height : 23, x: 24, y: 25,type : "Line", color : “white”};
    //console.log(intialArray.length);
    if(undefined !== screenObjects) {
        for (var i = 0; i < screenObjects.length; i++) {
            if (validObject(screenObjects[i].id, true)) {
                intialArray.push(updateAllItemValues(screenObjects[i]));
                //console.log(screenObjects[i].id);
            }
        }
        ;
    }

    if(debugInitMSG){
        for (var i = 0; i < intialArray.length; i++) {
            //console.log(intialArray[i])
        };
    }

    //console.log(intialArray.length);

    sendCommands();//sends lisp commands

    sendInit(intialArray);
};


//INTERACTIONS BACK WITH THE TASK HERE.
ws.onmessage = function (evt) {
    console.log(evt);
    var obj = JSON.parse(evt.data);
    if(obj.Command == "keypress"){
        //Key Presses are handled here. Can add additional handlers if necesarry.
        var keyCodeOfNew = KEYCODES[obj.index];
        simKeyEvent(keyCodeOfNew,"keydown");
    }
    else if(obj.Command == "mouseMove"){//Handle mouse moves mMatb uses invisible mouse system for logging information

        //Your mouse movement action data logging function calls go here.

        //MATB Example is
        //track_chart.mouseLocation({x:obj.mouseX,y:obj.mouseY});
    }
    else if(obj.Command == "mouseClick"){


        /////////////useful values for more specific use/////////////////
        // var allclickableObjects = obj.allclickableObjects;
        //Array of all clickable objects. Each object contains "id","type","x","y","height","width"

        var clickedObjectIdentifiers = obj.clickedObjectIdentifiers; //Array of string object ID's that were clicked.
        //document.elementFromPoint(obj.mouseX,obj,mouseY) //Gets DOM element from location on screen.
        //dispatchMouseEvent(document.getElementById("clickElementName"),'click',true,true)// Dispatches a click event on an object


        //clickable impl
        if(clickedObjectIdentifiers.length == 0){
            dispatchMouseEvent(document.elementFromPoint(obj.mouseX,obj.mouseY),'click',true,true);
        } else{
            for (var i = 0; i < clickedObjectIdentifiers.length; i++) {
                dispatchMouseEvent(document.getElementById(clickedObjectIdentifiers[i]),'click',true,true);
            };
        }
    }



    //split items into arrays based on their update functions
    else if(obj.Command == "sync" && !onlyUpdateInit){
        console.log("Synced initial data sent. Starting object updates now.");
        // myDate = new Date(); Original idea for init timestamp this has changed to getting at start of execution.
        for(var i = 0; i < screenObjects.length; i++){
            if(validObject(screenObjects[i].id,false)){
                if(screenObjects[i].change == "poll"){
                    dynamicPolling.push(screenObjects[i])
                }
                else if(screenObjects[i].change == undefined || screenObjects[i].change == "evt"){
                    dynamicEvent.push(screenObjects[i])
                }
                else if(typeof screenObjects[i].change == "object"){
                    if(screenObjects[i].change[0] == "poll"){
                        if(screenObjects[i].taskRelevant || screenObjects[i].taskRelevant == undefined){
                            dynamicPolling.push(screenObjects[i])
                        }
                    } else if(screenObjects[i].taskRelevant || screenObjects[i].taskRelevant == undefined){
                        dynamicEvent.push(screenObjects[i])
                    }
                };
            }
        }

        setMutationObserver(dynamicEvent);
        intervalFunction(dynamicPolling);
    }//end sync
}; //end onmsg

/////////////////////////////
///////Update functions//////
/////////////////////////////

//Updates all poling based update items here.
var intervalFunction = function(dynamicItems){
    setInterval(function() {
        var updateArray = new Array();

        for (var i = 0; i < dynamicItems.length; i++) {
            var currentObject = dynamicItems[i]; //Entire object
            if(currentObject.change = undefined){
                updateArray.push(updateSpecificValues(currentObject));
            }
            else {  //If change not found update EVERYTHING
                updateArray.push(updateAllItemValues(currentObject));
            }


        }
        if(updateArray.length > 0 ){
            sendUpdateMessage(updateArray);
        }

    }, refreshRate);
};
//Adds the observer to the objects an sets what function will receive.
var setMutationObserver = function(dynamicPolling){
    for (var i = 0; i < dynamicPolling.length; i++) {
        if(typeof dynamicPolling[i].id == "string"){
            var target = document.getElementById(dynamicPolling[i].id)
        } else{
            var target = dynamicPolling[i].id.domLocation;
        }
        var config = {attributes: true,childList:true, characterData:true}
        observer.observe(target,config);
    };
};
//What is actually called when a mutation occurs
//Finds screenObjects item and updates its specified values.
var observer = new MutationObserver(function(mutations){
    var updateArray = new Array();
    mutations.forEach(function(mutation){
        for (var i = 0; i < dynamicEvent.length; i++) {
            if(typeof dynamicEvent[i].id == "string"){
                if(document.getElementById(dynamicEvent[i].id) == mutation.target){
                    if(typeof dynamicEvent[i].change == "string" || dynamicEvent[i].change == undefined){
                        updateArray.push(updateAllItemValues(dynamicEvent[i]));
                    } else {
                        updateArray.push(updateSpecificValues(dynamicEvent[i]));
                    }
                }

            } else{

                if(mutation.target == dynamicEvent[i].id.domLocation){
                    if(typeof dynamicEvent[i].change == "string" || dynamicEvent[i].change == undefined){
                        updateArray.push(updateAllItemValues(dynamicEvent[i]));
                    } else {
                        updateArray.push(updateSpecificValues(dynamicEvent[i]));
                    }
                }


            }
        };
    });
    if(updateArray.length > 0){
        sendUpdateMessage(updateArray);
    }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////// Commonly used utility functions here.
/////////////////////////////////////////////////

var getObjectXYHW = function(findObject){ //Find object is either a String UID or Document element
    var objXYHW;
    if(typeof findObject == "string"){ //If passed string assume DOM ID and getById
        objXYHW = {
            x: document.getElementById(findObject).getBoundingClientRect().left,
            y: document.getElementById(findObject).getBoundingClientRect().top,
            height: document.getElementById(findObject).getBoundingClientRect().height,
            width: document.getElementById(findObject).getBoundingClientRect().width
        }
    }
    else if(typeof findObject == "object"){ //If passed actual DOM object
        objXYHW = {
            x: findObject.getBoundingClientRect().left,
            y: findObject.getBoundingClientRect().top,
            height: findObject.getBoundingClientRect().height,
            width: findObject.getBoundingClientRect().width
        }
    }
    return objXYHW;
}

//Used to find color information of object based on screenObject declarations
//Simple case color is string. Return it.
//if color is not specified attempt to automatically extract color information.
//Will call pull CSS color to do this
//Complex case , color is array of styles/classes, will loop through and query elements to find the object
var getColor = function(domOfCurrent , currentObject, primSecValue){ //domOfCurrent is the element, currentObject is the screenObject decelaration, primSecValie is either 1 or 0 and is used for knowing to get primary or secondary Color.
    var currentObjectColor;

    if(primSecValue == 0){
        currentObjectColor = currentObject.color
    }
    else if(primSecValue == 1){
        currentObjectColor = currentObject.secondaryColor
    }

    if(typeof currentObjectColor == "string"){
        return currentObjectColor; //is raw color
    }
    else if (typeof currentObjectColor == "object"){
        var arrayOfColors = currentObjectColor;
        for (var j = 0; j < arrayOfColors.length; j++) {
            if(arrayOfColors[j].class != undefined){
                if(arrayOfColors[j].class == domOfCurrent.className.animVal) {
                    return arrayOfColors[j].real;
                }
            }
            else if(arrayOfColors[j].style != undefined){
                if(arrayOfColors[j].style == domOfCurrent.style.cssText){
                    return arrayOfColors[j].real;
                }
            }
        };
    }
    else if(currentObjectColor == undefined){
        var b =  pullCSSColor(domOfCurrent, currentObject.type, primSecValue);
        // console.log(b)
        return b;
    }
}

//Determines the type of the object and what to look for based on that. IE if it is oval/rectangle outline, line look for stroke color otherwise look for fill color
//Then figures out where that information is stored, either CSS class or inline styles.
//Pulls this information using specificity caclulator for CSS classes and just a simple query for inline styles.
//Sends this information off to findTypeAndColorValue to parse it depending on the web browser
var pullCSSColor = function(domOfCurrent, type, primSecValue){ //domOfCurrent is the element, currentObject is the screenObject decelaration, primSecValie is either 1 or 0 and is used for knowing to get primary or secondary Color.
    var lookingFor;
    if(type == "Line"|| type == "OvalOutline" || type == "RectangleOutline" || (type == "OvalOutlineFill" && primSecValue == 1) || (type == "RectangleOutlineFill" && primSecValue == 1) ){
        lookingFor = "stroke:"
    } else if(type == "Rectangle" || type == "Oval" || type == "Label" || (type == "OvalOutlineFill" && primSecValue == 0) || (type == "RectangleOutlineFill" && primSecValue == 0) ){
        lookingFor = "fill:"
    }

    if(domOfCurrent.style.cssText.indexOf(lookingFor) == -1){
        //Is a class
        var rulesOnDomObj = getAppliedCssRules(domOfCurrent);
        if(rulesOnDomObj.length > 0){
            for (var i = 0; i < rulesOnDomObj.length; i++) {
                var topRule = rulesOnDomObj[rulesOnDomObj.length - 1 - i];
                if(topRule.cssText.indexOf(lookingFor) != -1){
                    var toParse = topRule.cssText.substring(topRule.cssText.indexOf(lookingFor)).toUpperCase();
                    toParse = toParse.substring(toParse.indexOf(lookingFor) + lookingFor.length +1,toParse.indexOf(";") + 1)
                    return findTypeAndColorValue(toParse); //PARSED DATA
                }
            };

        } else return "black"

    }
    else {
        //Is an inline style
        var rgbStyle = domOfCurrent.style.cssText
        var toParse = rgbStyle.substring(rgbStyle.indexOf(lookingFor)).toUpperCase();
        toParse = toParse.substring(toParse.indexOf(lookingFor) + lookingFor.length +1,toParse.indexOf(";") + 1)
        return findTypeAndColorValue(toParse); //PARSED DATA    }
    }
}
//This function parses the actual text content when the chosen css class has been found.
//Different browsers use different setups and representations for this information. 3 Known to me are supported #000000,RGB(0,0,0) and "white"
var findTypeAndColorValue = function(rgbStyle){
    if(rgbStyle.indexOf("RGB") != -1){
        //Is RGB style. ie "fill: rgb(25, 25, 25);", chrome 39+ does this.
        var rgb = rgbStyle.replace(" ", "").replace(" ", "").replace(" ", "");
        rgb = rgb.substring(rgb.indexOf("("), rgb.indexOf(")") +1);
        var index = cssRGB.indexOf(rgb);
        if(index == -1){
            console.log("Invalid color detected : " + rgbStyle)
            return "black";
        } else return cssNames[index];
    } else if (rgbStyle.indexOf("#") != -1){
        //is hex style.. older chrome versions do this
        var parseToCheck = rgbStyle.substring(rgbStyle.indexOf("#"),rgbStyle.indexOf(";")).toUpperCase();
        var index = cssHex.indexOf(parseToCheck);
        if(index == -1){ //invalid color
            console.log("Invalid color detected : " + rgbStyle)
            return "black"
        } else return cssNames[index];
    }
    else if(rgbStyle != "" && rgbStyle != null){
        //is a literal word of CSS color. 34.05 firefox does this
        rgbStyle = rgbStyle.substring(1,rgbStyle.length - 1)
        if(cssNames.indexOf(rgbStyle.toLowerCase()) != -1) return rgbStyle;
        else {
            console.log("Invalid color detected : " + rgbStyle)
            return "black";
        }
    }

    else {
        console.log("Invalid color detected : " + rgbStyle)
        return "black";
    }
};



var SPECIFICITY = (function() {
    var calculate,
        calculateSingle;

    calculate = function(input) {
        var selectors,
            selector,
            i,
            len,
            results = [];

        // Separate input by commas
        selectors = input.split(',');

        for (i = 0, len = selectors.length; i < len; i += 1) {
            selector = selectors[i];
            if (selector.length > 0) {
                results.push(calculateSingle(selector));
            }
        }

        return results;
    };

    // Calculate the specificity for a selector by dividing it into simple selectors and counting them
    calculateSingle = function(input) {
        var selector = input,
            findMatch,
            typeCount = {
                'a': 0,
                'b': 0,
                'c': 0
            },
            parts = [],
        // The following regular expressions assume that selectors matching the preceding regular expressions have been removed
            attributeRegex = /(\[[^\]]+\])/g,
            idRegex = /(#[^\s\+>~\.\[:]+)/g,
            classRegex = /(\.[^\s\+>~\.\[:]+)/g,
            pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,
        // A regex for pseudo classes with brackets - :nth-child(), :nth-last-child(), :nth-of-type(), :nth-last-type(), :lang()
            pseudoClassWithBracketsRegex = /(:[\w-]+\([^\)]*\))/gi,
        // A regex for other pseudo classes, which don't have brackets
            pseudoClassRegex = /(:[^\s\+>~\.\[:]+)/g,
            elementRegex = /([^\s\+>~\.\[:]+)/g;

        // Find matches for a regular expression in a string and push their details to parts
        // Type is "a" for IDs, "b" for classes, attributes and pseudo-classes and "c" for elements and pseudo-elements
        findMatch = function(regex, type) {
            var matches, i, len, match, index, length;
            if (regex.test(selector)) {
                matches = selector.match(regex);
                for (i = 0, len = matches.length; i < len; i += 1) {
                    typeCount[type] += 1;
                    match = matches[i];
                    index = selector.indexOf(match);
                    length = match.length;
                    parts.push({
                        selector: match,
                        type: type,
                        index: index,
                        length: length
                    });
                    // Replace this simple selector with whitespace so it won't be counted in further simple selectors
                    selector = selector.replace(match, Array(length + 1).join(' '));
                }
            }
        };

        // Remove the negation psuedo-class (:not) but leave its argument because specificity is calculated on its argument
        (function() {
            var regex = /:not\(([^\)]*)\)/g;
            if (regex.test(selector)) {
                selector = selector.replace(regex, '     $1 ');
            }
        }());

        // Remove anything after a left brace in case a user has pasted in a rule, not just a selector
        (function() {
            var regex = /{[^]*/gm,
                matches, i, len, match;
            if (regex.test(selector)) {
                matches = selector.match(regex);
                for (i = 0, len = matches.length; i < len; i += 1) {
                    match = matches[i];
                    selector = selector.replace(match, Array(match.length + 1).join(' '));
                }
            }
        }());

        // Add attribute selectors to parts collection (type b)
        findMatch(attributeRegex, 'b');

        // Add ID selectors to parts collection (type a)
        findMatch(idRegex, 'a');

        // Add class selectors to parts collection (type b)
        findMatch(classRegex, 'b');

        // Add pseudo-element selectors to parts collection (type c)
        findMatch(pseudoElementRegex, 'c');

        // Add pseudo-class selectors to parts collection (type b)
        findMatch(pseudoClassWithBracketsRegex, 'b');
        findMatch(pseudoClassRegex, 'b');

        // Remove universal selector and separator characters
        selector = selector.replace(/[\*\s\+>~]/g, ' ');

        // Remove any stray dots or hashes which aren't attached to words
        // These may be present if the user is live-editing this selector
        selector = selector.replace(/[#\.]/g, ' ');

        // The only things left should be element selectors (type c)
        findMatch(elementRegex, 'c');

        // Order the parts in the order they appear in the original selector
        // This is neater for external apps to deal with
        parts.sort(function(a, b) {
            return a.index - b.index;
        });

        return {
            selector: input,
            specificity: '0,' + typeCount.a.toString() + ',' + typeCount.b.toString() + ',' + typeCount.c.toString(),
            parts: parts
        };
    };

    return {
        calculate: calculate
    };
}());


function getAppliedCssRules(element) { //Gets CSS rules applied to element and sorts them by specificity
    var appliedRules = [],
        powers = [1000,100,10,1];

    for (var x = 0; x < document.styleSheets.length; x++) {
        var rules = document.styleSheets[x].cssRules;
        for (var i = 0; i < rules.length; i++) {
            if ($(element).is(rules[i].selectorText)) {
                appliedRules.push(rules[i]);
            }
        }
    }

    function comparator (rule1, rule2) {
        var s1 = SPECIFICITY.calculate(rule1.selectorText),
            s2 = SPECIFICITY.calculate(rule2.selectorText),
            total1 = 0,
            total2 = 0;

        $.each(s1[0].specificity.split(','), function(i, value) {
            total1 += value * powers[i];
        });
        $.each(s2[0].specificity.split(','), function(i, value) {
            total2 += value * powers[i];
        });

        return total1 - total2;
    }

    appliedRules.sort(comparator)
    return appliedRules;
}


var validObject = function(identifier,bool){

    if(typeof identifier == "string"){
        if(document.getElementById(identifier) == null){
            if(bool) console.log("INVALID screen object - Not found : " + identifier);
            return false;
        }
        else return true;
    }
    if(typeof identifier == "object"){
        if((identifier) == null){
            if(bool) console.log("DOM location provided not valid");
            return false;
        }

        if(identifier.domLocation != undefined){ //is screenObject id.
            if((identifier.domLocation) == null){
                if(bool) console.log("Not found : " + identifier.name);
                return false;
            }
            else return true;
        } else return true;

    }
};
//This function is used when there is an array up of update values.
//Loops through pushing the values to an object
var updateSpecificValues = function(currentObject){
    var changingItems = currentObject.change; //Array of changing items
    var pushedItem = {type:currentObject.type}; //Actual to push item
    var domObject;
    //X/Y/Height/Width/StringVal/Color
    if(typeof currentObject.id == "string"){
        var objSizeLocation = getObjectXYHW(currentObject.id);
        domObject = document.getElementById(currentObject.id);
        pushedItem.id = currentObject.id;
    }
    else{
        var objSizeLocation = getObjectXYHW(currentObject.id.domLocation);
        domObject = currentObject.id.domLocation;
        pushedItem.id = currentObject.id.name;
    }
    for (var j = 0; j < currentObject.change.length;j++) {
        itemChanging = changingItems[j];


        if(itemChanging == "x"){pushedItem.x = objSizeLocation.x}
        else if(itemChanging == "y"){pushedItem.y = objSizeLocation.y}
        else if(itemChanging == "height"){pushedItem.height = objSizeLocation.height}
        else if(itemChanging == "width"){pushedItem.width = objSizeLocation.width}
        else if(itemChanging == "stringVal"){pushedItem.stringVal =  domObject.textContent}
        else if(itemChanging == "color"){
            pushedItem.color = getColor(domObject,currentObject, "0");
        }
        else if(itemChanging == "secondaryColor"){
            pushedItem.secondaryColor = getColor(domObject,currentObject, "1");
        }

    };
    if(pushedItem.type == "Line"){
        var h = pushedItem.height;
        var w = pushedItem.width;
        if(domObject.getAttribute("stroke-width") != null){
            if(h== 0 && w != 0 ){
                pushedItem.height = domObject.getAttribute("stroke-width").replace(/[^\d.-]/g,'');
                pushedItem.y = pushedItem.y - pushedItem.height/2;

            }
            else if(h != 0 && w== 0){
                pushedItem.width = domObject.getAttribute("stroke-width").replace(/[^\d.-]/g,'');
                pushedItem.x = pushedItem.x - pushedItem.width/2;
            }
        } else {
            if(h == 0 && w!= 0){
                pushedItem.height = lineWidth;
                pushedItem.y = pushedItem.y - pushedItem.height/2;
            } else if(h != 0 && w == 0){
                pushedItem.width = lineWidth;
                pushedItem.x = pushedItem.x - pushedItem.width/2;
            }
        }

    }
    return(pushedItem);
}

//This function is used for updating all object values. This will be called during the init push of all items and when update items require all fields.
var updateAllItemValues = function(currentObject){
    var toPush;
    var domOfCurrent;
    //All objects need XYHW/id so add that here to everything. Specific things specified below
    if(typeof currentObject.id == "string"){
        domOfCurrent = document.getElementById(currentObject.id);
        toPush = getObjectXYHW(currentObject.id);
        toPush.id = (currentObject.id)
        console.log(toPush.id);
        console.log(toPush.x);
        console.log(toPush.y);
        console.log(toPush.width);
        console.log(toPush.height);
    } else{
        domOfCurrent = currentObject.id.domLocation;
        toPush = getObjectXYHW(currentObject.id.domLocation);
        toPush.id = (currentObject.id.name)
        console.log(toPush.id);
        console.log(toPush.x);
        console.log(toPush.y);
        console.log(toPush.width);
        console.log(toPush.height);
    }

    //console.log(domOfCurrent);

    if(currentObject.type == "Label"){
        toPush.stringVal = domOfCurrent.textContent;
        toPush.color = getColor(domOfCurrent,currentObject, "0");
        toPush.type = "Label";
    }
    else if(currentObject.type == "DiagonalLine") {//added by Liang Dong

        toPush.type = "DiagonalLine";
        var h = toPush.height;
        var w = toPush.width;


        toPush.x1 = domOfCurrent.getAttribute('x1');
        toPush.x2 = domOfCurrent.getAttribute('x2');
        toPush.y1 = domOfCurrent.getAttribute('y1');
        toPush.y2 = domOfCurrent.getAttribute('y2');

        console.log(toPush.x1);
        console.log(toPush.y1);
        console.log(toPush.x2);
        console.log(toPush.y2);

            toPush.x1 = toPush.x;
            toPush.x2 = toPush.x + toPush.width;



        if(parseInt(toPush.y1) > parseInt(toPush.y2))
        {
            toPush.y1 = toPush.y + toPush.height;
            toPush.y2 = toPush.y;
        }
        else
        {
            toPush.y1 = toPush.y;
            toPush.y2 = toPush.y + toPush.height;
        }

        console.log(toPush.x1);
        console.log(toPush.y1);
        console.log(toPush.x2);
        console.log(toPush.y2);

        if(domOfCurrent.getAttribute("stroke-width") != null){
            if(h== 0 && w != 0 ){
                toPush.height = domOfCurrent.getAttribute("stroke-width").replace(/[^\d.-]/g,'');
                toPush.y = toPush.y - toPush.height/2;

            }
            else if(h != 0 && w== 0){
                toPush.width = domOfCurrent.getAttribute("stroke-width").replace(/[^\d.-]/g,'');
                toPush.x = toPush.x - toPush.width/2;
            }
        } else {
            if(h == 0 && w!= 0){
                toPush.height = lineWidth;
                toPush.y = toPush.y - toPush.height/2;
            } else if(h != 0 && w == 0){
                toPush.width = lineWidth;
                toPush.x = toPush.x - toPush.width/2;
            }
        }
        toPush.color = getColor(domOfCurrent,currentObject, "0");
        
    }
    else if(currentObject.type == "Line"){
        toPush.type = "Line";
        var h = toPush.height;
        var w = toPush.width;
        //console.log(h);
        //console.log(w);

        if(domOfCurrent.getAttribute("stroke-width") != null){
            if(h== 0 && w != 0 ){
                toPush.height = domOfCurrent.getAttribute("stroke-width").replace(/[^\d.-]/g,'');
                toPush.y = toPush.y - toPush.height/2;

            }
            else if(h != 0 && w== 0){
                toPush.width = domOfCurrent.getAttribute("stroke-width").replace(/[^\d.-]/g,'');
                toPush.x = toPush.x - toPush.width/2;
            }
        } else {
            if(h == 0 && w!= 0){
                toPush.height = lineWidth;
                toPush.y = toPush.y - toPush.height/2;
            } else if(h != 0 && w == 0){
                toPush.width = lineWidth;
                toPush.x = toPush.x - toPush.width/2;
            }
        }
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }
    else if(currentObject.type == "Cross"){
        toPush.type = "Cross";
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }
    else if(currentObject.type == "RectangleOutline"){
        toPush.type = "RectangleOutline";
        toPush.thickness = defaultThickness;
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }
    else if(currentObject.type == "RectangleOutlineFill"){
        toPush.type = "RectangleOutlineFill";
        toPush.thickness = defaultThickness;
        toPush.color = getColor(domOfCurrent,currentObject, "0");
        toPush.secondaryColor = getColor(domOfCurrent,currentObject, "1");

    }
    else if(currentObject.type == "Rectangle"){
        if(currentObject.taskRelevant == false){
            toPush.type = "Line";
        } else
            toPush.type = "Rectangle";
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }
    else if(currentObject.type == "Oval"){
        toPush.type = "Oval";
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }
    else if(currentObject.type == "OvalOutline"){
        toPush.type = "OvalOutline";
        toPush.thickness = defaultThickness;
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }
    else if(currentObject.type == "OvalOutlineFill"){
        toPush.type = "OvalOutlineFill";
        toPush.thickness = defaultThickness;
        toPush.secondaryColor = getColor(domOfCurrent,currentObject, "1");
        toPush.color = getColor(domOfCurrent,currentObject, "0");
    }

    //Special variables
    if(currentObject.clickable == true){
        toPush.clickable = true;
    }
    if(currentObject.taskRelevant == false){
        toPush.taskRelevant = false;
    }
    return toPush;
};
//basic JSONRPC function for sending init commands.
var sendCommands = function(){
    readyCommands();
    var runCommand = {
        id: requestCounter,
        method: "runCommand",
        params:   [{debugServerInitMsgs: debugServerInitMsgs, debugServerUpdateMsgs : debugServerUpdateMsgs, recordActrLogFile: recordActrLogFile}, modelCommands],
        jsonrpc: "2.0"
    };
    if(ws.readyState == true){
        ws.send((JSON.stringify(runCommand)));
        requestCounter++;
    }
}
//JSONRPC for init msg with all init objects
var sendInit = function(initArray){
    var startUpMsg = {
        id: requestCounter,
        method: "init",
        params:   [myDate * 1, initArray],
        jsonrpc: "2.0"
    };

    if(ws.readyState == true){
        ws.send((JSON.stringify(startUpMsg)));
        requestCounter++;
    }
}
////Utility function used to make it easier to send messages
//args needs to be an Array of update objects if you don't want the server to get a parse error.
var sendUpdateMessage = function(arrayOfVisObjects){
    if(debugUpdateMSG){
        console.log("BEGIN UPDATE OBJECTS BLOCK");
        for (var i = 0; i < arrayOfVisObjects.length; i++) {
            console.log(arrayOfVisObjects[i]);
        };
        console.log("END UPDATE OBJECTS BLOCK");

    }
    var myUpdateDate = new Date();
    var timeSince = (myUpdateDate) * 1;
    var msg = {
        id: requestCounter,
        method: "update",
        params:   [timeSince, arrayOfVisObjects],
        jsonrpc: "2.0"
    };
    if(ws.readyState == true){
        ws.send((JSON.stringify(msg)));
        requestCounter++;
    }
}

//WebSocket Utility here. Error checking and default assumptions.
//If server not alive
ws.onclose = function() {
    console.log("Server not currently running!");
};
//Error function, generally triggered if server is offline or is turned off mid execution.
ws.onerror = function(err) {
    console.log("Error on : " + err.valueOf().srcElement.toString());
};


//////////////////////////////////////////////
/////////////Useful key/Mouse simulation tools
//////////////////////////////////////////////

//Simulates a keypress. Uses chromium work around.
simKeyEvent = function(k,evtType) { //K is the keycode
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack due to bug in chromium giving keyCode and which value 0.
    // Works in firefox 33 fine. Havent tested internet explorer.
    Object.defineProperty(oEvent, 'keyCode', {
        get : function() {
            return this.keyCodeVal;
        }
    });
    Object.defineProperty(oEvent, 'which', {
        get : function() {
            return this.keyCodeVal;
        }
    });

    if (oEvent.initKeyboardEvent) {
        oEvent.initKeyboardEvent(evtType, true, true, document.defaultView, false, false, false, false, k, k);
    } else {
        oEvent.initKeyEvent(evtType, true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        console.log("Error generating keypress simulation : Keycode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}
//Can be used to create any sort of mouse event ie click mouse over etc.
//Utility function for mouse click interactions.
var dispatchMouseEvent = function(target, var_args) {
    var e = document.createEvent("MouseEvents");
    // If you need clientX, clientY, etc., you can call
    // initMouseEvent instead of initEvent
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
};

//Mapping ACT-R key codes to number keycodes within JavaScript.
var KEYCODES = {
    "0":"48","1":"49","2":"50","3":"51","4":"52","5":"53","6":"54","7":"55","8":"56","9":"57","delete":"46","tab":"9","return":"13","shift":"16","right-shift":"16","caps-lock":"20",
    "escape":"27","pageup":"33","pagedown":"34","end":"35","home":"36","left-arrow":"37","up-arrow":"38","right-arrow":"39","down-arrow":"40","a":"65","b":"66","c":"67","d":"68","e":"69","f":"70",
    "g":"71","h":"72","i":"73","j":"74","k":"75","l":"76","m":"77","n":"78","o":"79","p":"80","q":"81","r":"82","s":"83","t":"84","u":"85","v":"86","w":"87","x":"88","y":"89","z":"90","left-command":"91",
    "right-command":"92","numpad-0":"96","numpad-1":"97","numpad-2":"98","numpad-3":"99","numpad-4":"100","numpad-5":"101","numpad-6":"102","numpad-7":"103","numpad-8":"104","numpad-9":"105","*":"106",
    "+":"107","-":"189","/":"191","f1":"112","f2":"113","f3":"114","f4":"115","f5":"116","f6":"117","f7":"118","f8":"119","f9":"120","f10":"121","f11":"122","f12":"123","semicolon":"186","=":"187",
    "comma":"188","period":"190","[":"219","backslash":"220","]":"221","quote":"222"
};

//3 arrays corresponding to CSS true color identifers using hex/rgb/name. Can add or remove, but must do it at the same indexes in all 3.
var cssNames = ["black","white","red","lime","blue","yellow","cyan","magenta","silver","gray","maroon","olive","green","purple","teal","navy","maroon","darkred","brown","firebrick","crimson","red","tomato","coral","indianred","lightcoral","darksalmon","salmon","lightsalmon","orangered","darkorange","orange","gold","darkgoldenrod","goldenrod","palegoldenrod","darkkhaki","khaki","olive","yellow","yellowgreen","darkolivegreen","olivedrab","lawngreen","chartreuse","greenyellow","darkgreen","green","forestgreen","lime","limegreen","lightgreen","palegreen","darkseagreen","mediumspringgreen","springgreen","seagreen","mediumaquamarine","mediumseagreen","lightseagreen","darkslategray","teal","darkcyan","aqua","cyan","lightcyan","darkturquoise","turquoise","mediumturquoise","paleturquoise","aquamarine","powderblue","cadetblue","steelblue","cornflowerblue","deepskyblue","dodgerblue","lightblue","skyblue","lightskyblue","midnightblue","navy","darkblue","mediumblue","blue","royalblue","blueviolet","indigo","darkslateblue","slateblue","mediumslateblue","mediumpurple","darkmagenta","darkviolet","darkorchid","mediumorchid","purple","thistle","plum","violet","magenta","orchid","mediumvioletred","palevioletred","deeppink","hotpink","lightpink","pink","antiquewhite","beige","bisque","blanchedalmond","wheat","cornsilk","lemonchiffon","lightgoldenrodyellow","lightyellow","saddlebrown","sienna","chocolate","peru","sandybrown","burlywood","tan","rosybrown","moccasin","navajowhite","peachpuff","mistyrose","lavenderblush","linen","oldlace","papayawhip","seashell","mintcream","slategray","lightslategray","lightsteelblue","lavender","floralwhite","aliceblue","ghostwhite","honeydew","ivory","azure","snow","black","dimgray","gray","darkgray","silver","lightgray","gainsboro","whitesmoke","white"]
var cssHex = ["#000000","#FFFFFF","#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#C0C0C0","#808080","#800000","#808000","#008000","#800080","#008080","#000080","#800000","#8B0000","#A52A2A","#B22222","#DC143C","#FF0000","#FF6347","#FF7F50","#CD5C5C","#F08080","#E9967A","#FA8072","#FFA07A","#FF4500","#FF8C00","#FFA500","#FFD700","#B8860B","#DAA520","#EEE8AA","#BDB76B","#F0E68C","#808000","#FFFF00","#9ACD32","#556B2F","#6B8E23","#7CFC00","#7FFF00","#ADFF2F","#006400","#008000","#228B22","#00FF00","#32CD32","#90EE90","#98FB98","#8FBC8F","#00FA9A","#00FF7F","#2E8B57","#66CDAA","#3CB371","#20B2AA","#2F4F4F","#008080","#008B8B","#00FFFF","#00FFFF","#E0FFFF","#00CED1","#40E0D0","#48D1CC","#AFEEEE","#7FFFD4","#B0E0E6","#5F9EA0","#4682B4","#6495ED","#00BFFF","#1E90FF","#ADD8E6","#87CEEB","#87CEFA","#191970","#000080","#00008B","#0000CD","#0000FF","#4169E1","#8A2BE2","#4B0082","#483D8B","#6A5ACD","#7B68EE","#9370DB","#8B008B","#9400D3","#9932CC","#BA55D3","#800080","#D8BFD8","#DDA0DD","#EE82EE","#FF00FF","#DA70D6","#C71585","#DB7093","#FF1493","#FF69B4","#FFB6C1","#FFC0CB","#FAEBD7","#F5F5DC","#FFE4C4","#FFEBCD","#F5DEB3","#FFF8DC","#FFFACD","#FAFAD2","#FFFFE0","#8B4513","#A0522D","#D2691E","#CD853F","#F4A460","#DEB887","#D2B48C","#BC8F8F","#FFE4B5","#FFDEAD","#FFDAB9","#FFE4E1","#FFF0F5","#FAF0E6","#FDF5E6","#FFEFD5","#FFF5EE","#F5FFFA","#708090","#778899","#B0C4DE","#E6E6FA","#FFFAF0","#F0F8FF","#F8F8FF","#F0FFF0","#FFFFF0","#F0FFFF","#FFFAFA","#000000","#696969","#808080","#A9A9A9","#C0C0C0","#D3D3D3","#DCDCDC","#F5F5F5","#FFFFFF"];
var cssRGB = ["(0,0,0)","(255,255,255)","(255,0,0)","(0,255,0)","(0,0,255)","(255,255,0)","(0,255,255)","(255,0,255)","(192,192,192)","(128,128,128)","(128,0,0)","(128,128,0)","(0,128,0)","(128,0,128)","(0,128,128)","(0,0,128)","(128,0,0)","(139,0,0)","(165,42,42)","(178,34,34)","(220,20,60)","(255,0,0)","(255,99,71)","(255,127,80)","(205,92,92)","(240,128,128)","(233,150,122)","(250,128,114)","(255,160,122)","(255,69,0)","(255,140,0)","(255,165,0)","(255,215,0)","(184,134,11)","(218,165,32)","(238,232,170)","(189,183,107)","(240,230,140)","(128,128,0)","(255,255,0)","(154,205,50)","(85,107,47)","(107,142,35)","(124,252,0)","(127,255,0)","(173,255,47)","(0,100,0)","(0,128,0)","(34,139,34)","(0,255,0)","(50,205,50)","(144,238,144)","(152,251,152)","(143,188,143)","(0,250,154)","(0,255,127)","(46,139,87)","(102,205,170)","(60,179,113)","(32,178,170)","(47,79,79)","(0,128,128)","(0,139,139)","(0,255,255)","(0,255,255)","(224,255,255)","(0,206,209)","(64,224,208)","(72,209,204)","(175,238,238)","(127,255,212)","(176,224,230)","(95,158,160)","(70,130,180)","(100,149,237)","(0,191,255)","(30,144,255)","(173,216,230)","(135,206,235)","(135,206,250)","(25,25,112)","(0,0,128)","(0,0,139)","(0,0,205)","(0,0,255)","(65,105,225)","(138,43,226)","(75,0,130)","(72,61,139)","(106,90,205)","(123,104,238)","(147,112,219)","(139,0,139)","(148,0,211)","(153,50,204)","(186,85,211)","(128,0,128)","(216,191,216)","(221,160,221)","(238,130,238)","(255,0,255)","(218,112,214)","(199,21,133)","(219,112,147)","(255,20,147)","(255,105,180)","(255,182,193)","(255,192,203)","(250,235,215)","(245,245,220)","(255,228,196)","(255,235,205)","(245,222,179)","(255,248,220)","(255,250,205)","(250,250,210)","(255,255,224)","(139,69,19)","(160,82,45)","(210,105,30)","(205,133,63)","(244,164,96)","(222,184,135)","(210,180,140)","(188,143,143)","(255,228,181)","(255,222,173)","(255,218,185)","(255,228,225)","(255,240,245)","(250,240,230)","(253,245,230)","(255,239,213)","(255,245,238)","(245,255,250)","(112,128,144)","(119,136,153)","(176,196,222)","(230,230,250)","(255,250,240)","(240,248,255)","(248,248,255)","(240,255,240)","(255,255,240)","(240,255,255)","(255,250,250)","(0,0,0)","(105,105,105)","(128,128,128)","(169,169,169)","(192,192,192)","(211,211,211)","(220,220,220)","(245,245,245)","(255,255,255)"];
