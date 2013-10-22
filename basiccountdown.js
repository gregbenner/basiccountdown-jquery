;(function($) {
        $.fn.basiccountdown = function(options) {
                // Establish our default settings
                var settings = $.extend({
                        time:  0,
                        complete: null,
                        timesUp: null
                }, options);

                // do it, each clock
                return this.each( function() {
                        var $this = $(this);
                        var time = $(this).data('time-until') || settings.time;
                        var days, hours, minutes, theLoop;
                        var notFirstTime = false;
                        $this.append("<ul class='basic-countdown'><li class='days'></li><li class='days'></li><span class='colon'>:</span><li class='hours'></li><li class='hours'></li><span class='colon'>:</span><li class='minutes'></li><li class='minutes'></li></ul>");
                        
                        var dhm = function(t){
                            var cd = 24 * 60 * 60 * 1000,
                                ch = 60 * 60 * 1000,
                                d = Math.floor(t / cd),
                                h = Math.floor( (t - d * cd) / ch),
                                m = Math.round( (t - d * cd - h * ch) / 60000);
                            days = d.toString();
                            hours = h.toString();
                            minutes = m.toString();
                            if(days.length === 1) {
                                days = '0' + days;
                            }
                            if(hours.length === 1) {
                                hours = '0' + hours;
                            }
                            if(minutes.length === 1) {
                                minutes = '0' + minutes;
                            }
                        };

                        //initial parse of time
                        dhm(time);

                        //grab dom elements of newly appended clock                       
                        var daysDom = $this.find('.days');
                        var hoursDom = $this.find('.hours');
                        var minutesDom = $this.find('.minutes');

                        // update the dom
                        var currentTime = function() {    
                          daysDom.eq(0).text(days[0] || 0);
                          daysDom.eq(1).text(days[1] || 0);
                          hoursDom.eq(0).text(hours[0] || 0);
                          hoursDom.eq(1).text(hours[1] || 0);
                          minutesDom.eq(0).text(minutes[0] || 0);
                          minutesDom.eq(1).text(minutes[1] || 0);
                        };
                        
                        var updateTime = function() {
                            time -= 60000; // 1 minute is gone
                            dhm(time);
                            //console.log("current milliseconds " + time + "Current Days: " + days + " current hours " + hours + " current minutes " + minutes);

                            if(time > 0) {
                               currentTime();
                            }
                           
                            if (time <= 0 && $.isFunction(settings.timesUp)) {
                                settings.timesUp.call(this);
                                currentTime();
                                clearInterval(theLoop);
                            }
                        };

                        var timeLoop = function() {
                          theLoop = window.setInterval(updateTime, 60000);
                        };

                        currentTime();
                        timeLoop();
                        

                        if ($.isFunction(settings.complete)) {
                                settings.complete.call(this);
                        }
                });
        };

}(jQuery));