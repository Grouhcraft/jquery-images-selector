(function($) {
    $.fn.ImagesSelector = function(options) {
        options = $.extend({}, $.fn.ImagesSelector.defaults, options);
        return this.each(function() {
            $(this).addClass('j-im-sel');
            $('img', this).each(function() {

                var imgBox = $('<div class="imgBox"></div>');
                var subCont = $('<div class="subContainer"></div>');
                var img = $(this).clone();
                var cb_cont = $('<div class="img-cb"></div>');
                var cb = $('<input type="checkbox" />');
                var label = $('<label for=""></label>');
                var overlay = $('<div class="overlay"></div>');

                label.append(img);
                imgBox.append(subCont);
                subCont.append(label);
                subCont.append(cb_cont);
                cb_cont.append(cb);
                subCont.append(overlay);
                $(this).after(imgBox);
                $(this).remove();

                if (options.hideCheckbox) {
                    //TODO: Check in IE
                    //cb_cont.css('visibility', 'hidden');
                    cb_cont.css('display', 'none');
                }

                overlay.css({
                    opacity: overlay.css('opacity')
                });
                overlay.addClass('shadowbox');

                cb.attr('name', img.attr('id'));
                cb.attr('id', img.attr('id') + '_cb');
                label.attr('for', cb.attr('id'));

                var top = Math.round(img.outerHeight() / 2) + overlay.outerHeight();
                overlay.css('top', '-' + top + 'px');

                if (options.useImagesTitles) {
                    overlay.html(img.attr('title'));
                } else {
                    overlay.html(options.selectedText);
                }

                if (options.bounce) {

                    subCont.on('mouseenter', function() {
                        $(this).animate({
                            'margin-top': '-=' + options.bounceHeight,
                            'margin-bottom': '+=' + options.bounceHeight
                        }, options.bounceDuration, function() {});
                    });
                    subCont.on('mouseleave', function() {
                        $(this).animate({
                            'margin-top': '+=' + options.bounceHeight,
                            'margin-bottom': '-=' + options.bounceHeight
                        }, options.bounceDuration, function() {});
                    });
                }
                    
                cb.on('change', function() {
                    var subCont = $(this).parent().parent().parent();
                    var img = $('img', subCont);
                    if ($(this).is(':checked')) {
                        img.fadeTo('slow', 0.5);
                        var ov = $('div.overlay', subCont);
                        ov.css('bottom', img.outerHeight() + 'px');
                        ov.show();
                    } else {
                        $(this).parent().parent().children('div.overlay').hide();
                        $('img', subCont).fadeTo('slow', 1);
                    }
                });

                overlay.on('click', function() {
                    $(this).parent().find('label').click();
                });

                if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
                    label.on('click', function() {
                        var chkb = $('#' + $(this).attr('for'));
                        if (chkb.is(":checked")) {
                            chkb.prop('checked', false);
                            chkb.change();
                        }
                        else {
                            chkb.prop('checked', true);
                            chkb.change();
                        }
                    });
                }
            });
        });
    };
    $.fn.ImagesSelector.defaults = {
        selectedText: 'selected',
        useImagesTitles: false,
        hideCheckbox: true,
        bounceHeight: '10px',
        bounceDuration: 200,
        bounce: true
    };
})(jQuery);