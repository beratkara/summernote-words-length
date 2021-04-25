(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.plugins, {
        wordsLength: function (context) {
            var self = this;

            var layoutInfo = context.layoutInfo;
            var $editor = layoutInfo.editor;
            var $editable = layoutInfo.editable;
            var $statusbar = layoutInfo.statusbar;
            var wordsLength = $editor.parent().find('.summernote').data('wordslength');

            self.$label = null;

            self.initialize = function () {
                var label = document.createElement("span");
                self.$label = $(label);
                self.$label.addClass('maxlength text-dark');
                self.$label.css({width: 'auto', display: 'flex', 'justify-content': 'end', 'margin-right': '10px', 'margin-bottom': '10px'});
                $statusbar.append(self.$label);
                self.toggle($editable.text());

                $editable.on('keyup', function(){
                    self.toggle($editable.text());
                });
            };

            self.toggle = function(text){
                var length = text.trim().split(/\s+/).length;
                self.$label.text(length +" / "+ wordsLength);
                if(length > wordsLength){
                    self.$label.addClass('text-danger');
                    self.$label.removeClass('text-dark');
                }else{
                    self.$label.addClass('text-dark');
                    self.$label.removeClass('text-danger');
                }
            };

        }
    });
}));
