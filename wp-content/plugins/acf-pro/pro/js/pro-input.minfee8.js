!function($){acf.pro=acf.model.extend({actions:{conditional_logic_show_field:"show_field_cl",conditional_logic_hide_field:"hide_field_cl"},filters:{get_fields:"get_fields"},get_fields:function(t){return t=t.not(".acf-clone .acf-field")},show_field_cl:function(t){if(t.is("td")&&acf.is_sub_field(t)){var e=acf.get_field_key(t),a=t.closest(".acf-table"),i=a.find('> thead > tr > th[data-key="'+e+'"]'),l=a.find('> tbody > tr:not(.acf-clone) > td[data-key="'+e+'"]');t.removeClass("appear-empty"),l.filter(".hidden-by-conditional-logic").addClass("appear-empty"),i.removeClass("hidden-by-conditional-logic"),this.render_table(a)}},hide_field_cl:function(t){if(t.is("td")&&acf.is_sub_field(t)){var e=acf.get_field_key(t),a=t.closest(".acf-table"),i=a.find('> thead > tr > th[data-key="'+e+'"]'),l=a.find('> tbody > tr:not(.acf-clone) > td[data-key="'+e+'"]');t.addClass("appear-empty"),l.filter(".hidden-by-conditional-logic").length==l.length&&(l.removeClass("appear-empty"),i.addClass("hidden-by-conditional-logic")),this.render_table(a)}},render_table:function(t){if(!t.hasClass("row-layout")){var e=t.find("> thead > tr > th"),a=100,i=0;e.filter(".order").exists()&&(a=93),e.removeAttr("width"),e=e.not(".order, .remove, .hidden-by-conditional-logic"),e.filter("[data-width]").each(function(){if(i+1==e.length)return!1;i++;var t=parseInt($(this).attr("data-width"));a-=t,$(this).attr("width",t+"%")}),e.not("[data-width]").each(function(){if(i+1==e.length)return!1;i++;var t=a/e.length;$(this).attr("width",t+"%")})}}}),acf.fields.repeater=acf.field.extend({type:"repeater",$el:null,$tbody:null,$clone:null,actions:{ready:"initialize",append:"initialize"},events:{"click .acf-repeater-add-row":"add","click .acf-repeater-remove-row":"remove"},focus:function(){this.$el=this.$field.find(".acf-repeater:first"),this.$tbody=this.$el.find("tbody:first"),this.$clone=this.$tbody.children("tr.acf-clone"),this.settings=acf.get_data(this.$el)},initialize:function(){if(this.$tbody.on("mouseenter","tr.acf-row",function(t){var e=$(this),a=e.children(".remove"),i=a.find(".acf-repeater-add-row"),l=a.height()/2+9;i.css("margin-top","-"+l+"px")}),1!=this.settings.max){var t=this,e=this.$tbody,a=this.$field;e.one("mouseenter","td.order",function(i){e.unbind("sortable").sortable({items:"> tr",handle:"> td.order",forceHelperSize:!0,forcePlaceholderSize:!0,scroll:!0,start:function(t,e){acf.do_action("sortstart",e.item,e.placeholder)},stop:function(e,i){acf.do_action("sortstop",i.item,i.placeholder),t.doFocus(a).render()}})})}acf.pro.render_table(this.$el.children("table")),this.$clone.find("[name]").attr("disabled","disabled"),this.render()},count:function(){return this.$tbody.children().length-1},render:function(){this.$tbody.children().each(function(t){$(this).children("td.order").html(t+1)}),0==this.count()?this.$el.addClass("empty"):this.$el.removeClass("empty"),this.settings.max>0&&this.count()>=this.settings.max?(this.$el.addClass("disabled"),this.$el.find("> .acf-hl .acf-button").addClass("disabled")):(this.$el.removeClass("disabled"),this.$el.find("> .acf-hl .acf-button").removeClass("disabled"))},add:function(t){var e=this.$clone;if(t&&t.$el.is(".acf-icon")&&(e=t.$el.closest(".acf-row")),this.settings.max>0&&this.count()>=this.settings.max)return alert(acf._e("repeater","max").replace("{max}",this.settings.max)),!1;var a=acf.get_uniqid(),i=this.$clone.outerHTML(),i=i.replace(/(="[\w-\[\]]+?)(acfcloneindex)/g,"$1"+a),l=$(i);return l.removeClass("acf-clone"),l.find("[name]").removeAttr("disabled"),e.before(l),this.$field.parents(".acf-row").trigger("mouseenter"),this.render(),acf.validation.remove_error(this.$field),acf.do_action("append",l),l},remove:function(t){var e=this,a=this.$field,i=t.$el.closest(".acf-row"),l=i.closest("table");return this.count()<=this.settings.min?(alert(acf._e("repeater","min").replace("{min}",this.settings.min)),!1):void acf.remove_tr(i,function(){e.doFocus(a).render(),a.closest(".acf-row").trigger("mouseenter"),l.hasClass("table-layout")&&acf.conditional_logic.render(l)})}}),acf.fields.flexible_content=acf.field.extend({type:"flexible_content",$el:null,$values:null,$clones:null,actions:{ready:"initialize",append:"initialize"},events:{"click .acf-fc-remove":"remove","click .acf-fc-layout-handle":"toggle","click .acf-fc-popup li a":"add","click .acf-fc-add":"open_popup","blur .acf-fc-popup .focus":"close_popup"},focus:function(){this.$el=this.$field.find(".acf-flexible-content").first(),this.$values=this.$el.children(".values"),this.$clones=this.$el.children(".clones"),this.settings=acf.get_data(this.$el),this.settings.min=this.settings.min||0,this.settings.max=this.settings.max||0},count:function(){return this.$values.children(".layout").length},initialize:function(){if(1!=this.settings.max){var t=this,e=this.$values,a=this.$field;e.one("mouseenter",".acf-fc-layout-handle",function(i){e.unbind("sortable").sortable({items:"> .layout",handle:"> .acf-fc-layout-handle",forceHelperSize:!0,forcePlaceholderSize:!0,scroll:!0,start:function(t,e){acf.do_action("sortstart",e.item,e.placeholder)},stop:function(e,i){acf.do_action("sortstop",i.item,i.placeholder),t.doFocus(a).render()}})})}this.$values.find("> .layout > .acf-table").each(function(){acf.pro.render_table($(this))}),this.$clones.find("[name]").attr("disabled","disabled"),this.render()},render:function(){this.$values.children(".layout").each(function(t){$(this).find("> .acf-fc-layout-handle .fc-layout-order").html(t+1)}),0==this.count()?this.$el.addClass("empty"):this.$el.removeClass("empty"),this.settings.max>0&&this.count()>=this.settings.max?(this.$el.addClass("disabled"),this.$el.find("> .acf-hl .acf-button").addClass("disabled")):(this.$el.removeClass("disabled"),this.$el.find("> .acf-hl .acf-button").removeClass("disabled"))},validate_add:function(t){if(this.settings.max>0&&this.count()>=this.settings.max){var e=1==this.settings.max?"layout":"layouts",a=acf._e("flexible_content","max");return a=a.replace("{max}",this.settings.max),a=a.replace("{identifier}",acf._e("flexible_content",e)),alert(a),!1}var i=$(this.$el.children(".tmpl-popup").html()),l=i.find('[data-layout="'+t+'"]'),s=parseInt(l.attr("data-max")),n=this.$values.children('.layout[data-layout="'+t+'"]').length;if(s>0&&n>=s){var e=1==s?"layout":"layouts",a=acf._e("flexible_content","max_layout");return a=a.replace("{max}",n),a=a.replace("{label}",'"'+l.text()+'"'),a=a.replace("{identifier}",acf._e("flexible_content",e)),alert(a),!1}return!0},validate_remove:function(t){if(this.settings.min>0&&this.count()<=this.settings.min){var e=1==this.settings.min?"layout":"layouts",a=acf._e("flexible_content","min")+", "+acf._e("flexible_content","remove");return a=a.replace("{min}",this.settings.min),a=a.replace("{identifier}",acf._e("flexible_content",e)),a=a.replace("{layout}",acf._e("flexible_content","layout")),confirm(a)}var i=$(this.$el.children(".tmpl-popup").html()),l=i.find('[data-layout="'+t+'"]'),s=parseInt(l.attr("data-min")),n=this.$values.children('.layout[data-layout="'+t+'"]').length;if(s>0&&s>=n){var e=1==s?"layout":"layouts",a=acf._e("flexible_content","min_layout")+", "+acf._e("flexible_content","remove");return a=a.replace("{min}",n),a=a.replace("{label}",'"'+l.text()+'"'),a=a.replace("{identifier}",acf._e("flexible_content",e)),a=a.replace("{layout}",acf._e("flexible_content","layout")),confirm(a)}return!0},open_popup:function(t){var e=this.$values,a=$(this.$el.children(".tmpl-popup").html());a.find("a").each(function(){var t=parseInt($(this).attr("data-min")),a=parseInt($(this).attr("data-max")),i=$(this).attr("data-layout"),l=$(this).text(),s=e.children('.layout[data-layout="'+i+'"]').length,n=$(this).children(".status");if(a>0){var c=a-s,r=acf._e("flexible_content","available"),o=1==c?"layout":"layouts",r=r.replace("{available}",c);r=r.replace("{max}",a),r=r.replace("{label}",'"'+l+'"'),r=r.replace("{identifier}",acf._e("flexible_content",o)),n.show().text(c).attr("title",r),0==c&&n.addClass("warning")}if(t>0){var d=t-s,r=acf._e("flexible_content","required"),o=1==d?"layout":"layouts",r=r.replace("{required}",d);r=r.replace("{min}",t),r=r.replace("{label}",'"'+l+'"'),r=r.replace("{identifier}",acf._e("flexible_content",o)),d>0&&n.addClass("warning").show().text(d).attr("title",r)}}),t.$el.after(a),t.$el.attr("data-before")&&(a.addClass("within-layout"),a.closest(".layout").addClass("popup-open")),a.css({"margin-top":0-a.height()-t.$el.outerHeight()-14,"margin-left":(t.$el.outerWidth()-a.width())/2});var i=a.offset().top;30>i&&(a.css({"margin-top":15}),a.find(".bit").addClass("top")),a.children(".focus").trigger("focus")},close_popup:function(t){var e=t.$el.parent();e.closest(".layout").exists()&&e.closest(".layout").removeClass("popup-open"),setTimeout(function(){e.remove()},200)},add:function(t){var e=t.$el.closest(".acf-fc-popup"),a=t.$el.attr("data-layout");if(this.validate_add(a)){var i=acf.get_uniqid(),l=this.$clones.children('.layout[data-layout="'+a+'"]').outerHTML(),l=l.replace(/(="[\w-\[\]]+?)(acfcloneindex)/g,"$1"+i),s=$(l);s.find("[name]").removeAttr("disabled"),this.$el.children(".no-value-message").hide(),s.removeClass("acf-clone"),this.$values.append(s),e.hasClass("within-layout")&&e.closest(".layout").before(s),acf.do_action("append",s),this.render(),acf.validation.remove_error(this.$field)}},remove:function(t){var e=t.$el.closest(".layout");if(this.validate_remove(e.attr("data-layout"))){var a=0,i=this.$el.children(".no-value-message");0==e.siblings(".layout").length&&(a=i.outerHeight()),acf.remove_el(e,function(){a>0&&i.show()},a)}},toggle:function(t){var e=t.$el.closest(".layout");"closed"==e.attr("data-toggle")?(e.attr("data-toggle","open"),e.children(".acf-input-table").show()):(e.attr("data-toggle","closed"),e.children(".acf-input-table").hide()),this.sync()},sync:function(){var t="acf_collapsed_"+acf.get_data(this.$field,"key"),e=[];this.$values.children(".layout").each(function(t){"closed"==$(this).attr("data-toggle")&&e.push(t)}),acf.update_cookie(t,e.join("|"))}}),acf.fields.gallery=acf.field.extend({type:"gallery",$el:null,actions:{ready:"initialize",append:"initialize",submit:"close_sidebar"},events:{"click .acf-gallery-attachment":"select_attachment","click .remove-attachment":"remove_attachment","click .edit-attachment":"edit_attachment","click .update-attachment":"update_attachment","click .add-attachment":"add_attachment","click .close-sidebar":"close_sidebar","change .acf-gallery-side input":"update_attachment","change .acf-gallery-side textarea":"update_attachment","change .acf-gallery-side select":"update_attachment","change .bulk-actions":"sort"},focus:function(){this.$el=this.$field.find(".acf-gallery").first(),this.$values=this.$el.children(".values"),this.$clones=this.$el.children(".clones"),this.settings=acf.get_data(this.$el),this.settings.min=this.settings.min||0,this.settings.max=this.settings.max||0},get_attachment:function(t){t=t||"";var e=".acf-gallery-attachment";return"active"===t?e+=".active":t&&(e+='[data-id="'+t+'"]'),this.$el.find(e)},count:function(){return this.get_attachment().length},initialize:function(){var t=this,e=this.$field;this.$el.find(".acf-gallery-attachments").unbind("sortable").sortable({items:".acf-gallery-attachment",forceHelperSize:!0,forcePlaceholderSize:!0,scroll:!0,start:function(t,e){e.placeholder.html(e.item.html()),e.placeholder.removeAttr("style"),acf.do_action("sortstart",e.item,e.placeholder)},stop:function(t,e){acf.do_action("sortstop",e.item,e.placeholder)}}),this.$el.unbind("resizable").resizable({handles:"s",minHeight:200,stop:function(t,e){acf.update_user_setting("gallery_height",e.size.height)}}),$(window).on("resize",function(){t.doFocus(e).resize()}),this.render(),this.resize()},render:function(){var t=this.$el.find(".bulk-actions"),e=this.$el.find(".add-attachment");this.settings.max>0&&this.count()>=this.settings.max?e.addClass("disabled"):e.removeClass("disabled")},sort:function(t){var e=t.$el.val();if(e){var a=acf.prepare_for_ajax({action:"acf/fields/gallery/get_sort_order",field_key:acf.get_field_key(this.$field),post_id:acf.get("post_id"),ids:[],sort:e});this.get_attachment().each(function(){a.ids.push($(this).attr("data-id"))});var i=$.ajax({url:acf.get("ajaxurl"),dataType:"json",type:"post",cache:!1,data:a,context:this,success:this.sort_success})}},sort_success:function(t){if(acf.is_ajax_success(t)){t.data.reverse();for(i in t.data){var e=t.data[i],a=this.get_attachment(e);this.$el.find(".acf-gallery-attachments").prepend(a)}}},clear_selection:function(){this.get_attachment().removeClass("active")},select_attachment:function(t){var e=t.$el;if(!e.hasClass("active")){var a=e.attr("data-id");this.clear_selection(),e.addClass("active"),this.fetch(a),this.open_sidebar()}},open_sidebar:function(){this.$el.addClass("sidebar-open"),this.$el.find(".bulk-actions").hide(),this.$el.find(".acf-gallery-main").animate({right:350},250),this.$el.find(".acf-gallery-side").animate({width:349},250)},close_sidebar:function(){this.$el.removeClass("sidebar-open");var t=this.$el.find(".bulk-actions");this.clear_selection(),this.$el.find(".acf-gallery-side").find("input, textarea, select").attr("disabled","disabled"),this.$el.find(".acf-gallery-main").animate({right:0},250),this.$el.find(".acf-gallery-side").animate({width:0},250,function(){t.show(),$(this).find(".acf-gallery-side-data").html("")})},fetch:function(t){var e=acf.prepare_for_ajax({action:"acf/fields/gallery/get_attachment",field_key:acf.get_field_key(this.$field),nonce:acf.get("nonce"),post_id:acf.get("post_id"),id:t});this.$el.data("xhr")&&this.$el.data("xhr").abort();var a=$.ajax({url:acf.get("ajaxurl"),dataType:"html",type:"post",cache:!1,data:e,context:this,success:this.render_fetch});this.$el.data("xhr",a)},render_fetch:function(t){if(t){var e=this.$el.find(".acf-gallery-side-data");e.html(t),e.find(".compat-field-acf-form-data").remove();var a=e.find("> .compat-attachment-fields > tbody > tr").detach();e.find("> table.form-table > tbody").append(a),e.find("> .compat-attachment-fields").remove(),acf.do_action("append",e)}},update_attachment:function(){var t=this.$el.find(".update-attachment");return $form=this.$el.find(".acf-gallery-side-data"),data=acf.serialize_form($form),t.attr("disabled")?!1:(t.attr("disabled","disabled"),t.before('<i class="acf-loading"></i>'),data.action="acf/fields/gallery/update_attachment",acf.prepare_for_ajax(data),void $.ajax({url:acf.get("ajaxurl"),data:data,type:"post",dataType:"json",complete:function(e){t.removeAttr("disabled"),t.prev(".acf-loading").remove()}}))},add:function(t){if(this.settings.max>0&&this.count()>=this.settings.max)return void acf.validation.add_warning(this.$field,acf._e("gallery","max"));t.name=this.$el.find('[data-name="ids"]').attr("name");var e=acf._e("gallery","tmpl"),a=_.template(e,t);this.$el.find(".acf-gallery-attachments").append(a),this.render()},edit_attachment:function(t){var e=this,a=acf.get_data(t.$el,"id"),i=acf.media.popup({title:acf._e("image","edit"),button:acf._e("image","update"),mode:"edit",id:a,select:function(t){acf.isset(t,"attributes","sizes",e.settings.preview_size,"url")&&(t.url=t.attributes.sizes[e.settings.preview_size].url),e.get_attachment(a).find("img").attr("src",t.url),e.fetch(a)}})},remove_attachment:function(t){t.stopPropagation();var e=acf.get_data(t.$el,"id");this.clear_selection(),this.close_sidebar(),this.get_attachment(e).remove(),this.render()},render_collection:function(t){var e=this;setTimeout(function(){var a=t.content.get().$el;if(collection=t.content.get().collection||null){var i=-1;collection.each(function(t){i++;var l=a.find(".attachments > .attachment:eq("+i+")");e.get_attachment(t.id).exists()&&(t.off("selection:single"),l.addClass("acf-selected"))})}},10)},add_attachment:function(t){if(this.settings.max>0&&this.count()>=this.settings.max)return void acf.validation.add_warning(this.$field,acf._e("gallery","max"));var e=this.settings.library,a=this.settings.preview_size,i=this,l=acf.media.popup({title:acf._e("gallery","select"),mode:"select",type:"all",multiple:"add",library:e,select:function(t,e){if(!i.get_attachment(t.id).exists()){var l={id:t.id,url:t.attributes.url};"image"!=t.attributes.type&&(l.url=t.attributes.icon),acf.isset(t,"attributes","sizes",a)&&(l.url=t.attributes.sizes[a].url),i.add(l)}}});l.on("content:activate:browse",function(){i.render_collection(l),l.content.get().collection.on("reset add",function(){i.render_collection(l)})})},resize:function(){for(var t=100,e=175,a=4,i=this.$el.width(),l=0;10>l;l++){var s=i/l;if(s>t&&e>s){a=l;break}}this.$el.attr("data-columns",a)}})}(jQuery);