// ==UserScript==
// @name        Hide Premium - leetcode.com
// @match       https://leetcode.com/problemset/*
// @grant       none
// @version     1.0
// @author      sanjaykdragon
// @description 3/12/2020, 1:27:59 PM
// ==/UserScript==

function get_element_by_xpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function is_subscription_problem(index) {
    var xpath = "/html/body/div[1]/div[3]/div[2]/div[2]/div[1]/div/div/div[2]/div[2]/div[2]/table/tbody[1]/tr[" + index.toString() + "]/td[3]/div/span/span/i";
    var element = get_element_by_xpath(xpath);
  
    return (element != null) && (element != undefined);
}

function get_problem_by_index(index) {
  var xpath = "/html/body/div[1]/div[3]/div[2]/div[2]/div[1]/div/div/div[2]/div[2]/div[2]/table/tbody[1]/tr[" + index.toString() + "]";
  return get_element_by_xpath(xpath);
}

function remove_subscription_problems() {
  //assume 50 rows as default
  var modifier = 0;
  for (var index = 1; index <= 50; index++) {
      var element = get_problem_by_index(index);
      if (element == null || element == undefined) {
          continue;
      }
    
      if (is_subscription_problem(index)) {
          //console.log("problem #" + (index + modifier) + " is a subscription problem");
          index--;
          modifier++;
          element.remove();
      }
  }
}

function is_page_loaded() {
    var question_list_element = document.getElementsByClassName("question-list-table")[0];
    return (question_list_element != null) && (question_list_element != undefined); 
}

function do_main() {
    if (is_page_loaded()) {
        console.log("page loaded");
        remove_subscription_problems();
    } else {
      console.log("page not loaded");
      setTimeout(do_main, 200);
    }
}

do_main();
