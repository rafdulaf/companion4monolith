if (!localStorage.getItem("Welcome"))
{
    Tutorial = {
        _i18n: {
            'fr': {
                'welcome': "Bienvenue",
                'welcome_p1': "C'est votre premier accès au compagnon de Conan avec ce navigateur.",
                'welcome_p2': "Avant de commencer, il est recommandé de sélectionner vos extensions et régler vos préférences : Cela affectera par exemple les cartes que vous pourrez voir ou les scénarios que vous pourrez trouver.",
                'welcome_p4': "Choisir mes extensions",
                'welcome_p5': "Régler mes préférences",
                'welcome_p6': "A tout moment, le menu en haut à gauche vous permet de modifier vos préférences et extensions, et vous permet d'accéder à d'autres options.",
                'welcome_p7': "Accéder à l'application",
                'welcome_alternative': "Switch to english?"
            },
            'en': {
                'welcome': "Welcome",
                'welcome_p1': "It is your first access to the companion for Conan with this browser.",
                'welcome_p2': "Before starting, it is recommanded to select your expansions and customize your settings: This will change, for example, the boards you would see or the scenarios you could find.",
                'welcome_p4': "Select my expansions",
                'welcome_p5': "Customize my preferences",
                'welcome_p6': "At any time, the top left menu let you change your settings or expansions, and also contains other options.",
                'welcome_p7': "Access the application",
                'welcome_alternative': "Vous voulez voir ceci en français?"
            }
        },
        
        access: function() {
            localStorage.setItem("Welcome", true);
            $('body .tutorial').removeClass('open');
            window.setTimeout("$('body .tutorial-wrapper').remove()", 1800);
        },
        
        init: function() {
            $('body').append("<div class='tutorial-wrapper'><div class='tutorial'><div>" 
                        + "<h1>" + Tutorial._i18n[Language].welcome + "</h1>" 
                        + "<p>" + Tutorial._i18n[Language].welcome_p1 + "</p>" 
                        + "<p>" + Tutorial._i18n[Language].welcome_p2 + "</p>"
                        + "<p class='actions'>"
                        + "<a class='expansions' href='javascript:void(0)' onclick='ConanAbout._custom()'>" + Tutorial._i18n[Language].welcome_p4 + "</a>" 
                        + "<a class='settings' href='javascript:void(0)' onclick='ConanAbout._preferences()'>" + Tutorial._i18n[Language].welcome_p5 + "</a>" 
                        + "</p>"
                        + "<p>" + Tutorial._i18n[Language].welcome_p6 + "</p>" 
                        + "<p class='last'><a class='switch' href='javascript:void(0)' onclick='Tutorial.switchLanguage()'>" + Tutorial._i18n[Language].welcome_alternative + "</a><a class='access' href='javascript:void(0)' onclick='Tutorial.access()'>" + Tutorial._i18n[Language].welcome_p7 + "</a></p>" 
                        + "</div></div></div>");
            window.setTimeout("$('body .tutorial').addClass('open')", 1);
        },
        
        switchLanguage: function() {
            localStorage.setItem("Language", Language == 'fr' ? 'en' : 'fr');
            window.location.reload(true);
        }
    }
    
    $().ready(Tutorial.init);
}