/** 
 * MOFDAC Jupyter Notebook Theme.
 * Description : Themify your notebook
 * Author      : maziyank@gmail.com
 */

define(["require",
    'base/js/namespace'
], function (requirejs, Jupyter) {
    'use strict';

    const theme_list = [{
        name: 'MofDAC 1',
        css: requirejs.toUrl("./css/mofdac.css"),
        fonts: ["https://fonts.googleapis.com/css2?family=Poppins&display=swap"]
    }];

    const menu_item = (text, clickHandler) => {
        return $(`<li><a href="#" class="menu-shortcut-container"><span class="action mofdaclink">${text}</span></a><ul class="dropdown-menu"><li>`).click(clickHandler)
    }

    const init_toolbar = () => {
        const menu_bar = $(Jupyter.menubar.element).find('ul.navbar-nav');
        const dropdown_menu = $('<ul class="dropdown-menu" role="menu" id="mofdac-theme-menu"/>');
        const dropdown = $('<li class="dropdown"/>')
            .append(dropdown_menu)
            .append($('<a href="#" class="dropdown-toggle" data-toggle="dropdown">Themify</a>'));

        for (const theme of theme_list) {
            dropdown_menu.append(menu_item(theme.name, (event) => init_css(event, theme)));
        }

        dropdown_menu.append(menu_item("Jupyter Default", reset_css));

        menu_bar.append(dropdown);
    }

    const reset_css= (event) => {
        $("#mofdac-theme").remove();
        $('.mofdaclink').css('font-weight','normal');
        $(event.target).css('font-weight','bold');
    }

    const init_css = (event, theme) => {        
        reset_css(event);                
        $('head').append(`<link id="mofdac-theme" rel="stylesheet" href="${theme.css}" type="text/css" />`);         
        for (const font of theme.fonts) {
            $('head').append($(`<link rel="stylesheet" href="${font}"/>`));                     
        }
    }     

    const load_ipython_extension = () => {
        init_toolbar();        
    };

    return {
        load_ipython_extension: load_ipython_extension
    };
});