<script type="text/template" id="list-story-item">
    <div id="articles">
        <ul>
        <% _.each(objects, function(obj){ %>
        <% if(obj.id == undefined)return; %>
            <li>
                <article data-id="<%= obj.current_story_id %>" data-perm_id="<%= obj.id %>" class="recommended-story" style="text-overflow:ellipsis;overflow:hidden;">

                    <div class="story-wrap">
                        <% if(obj.description != ""){ %>
                        <img src="<%= obj.featured_image %>" class="canHideImage" onerror="this.onerror=null;this.src='<%= noStoriesThumb %>'">
                        <% if(obj.description.length > 160){ %>
                        <div class="description"><div class="container"><%- obj.description.substring(0,160) %>...</div></div>
                        <% } else { %>
                        <div class="description"><div class="container"><%- obj.description %></div></div>
                        <% } %>
                        <% } else { %>
                        <img src="<%= obj.featured_image %>" onerror="this.onerror=null;this.src='<%= noStoriesThumb %>'">
                        <% } %>
                    </div>
                    <h1><%- obj.title %></h1>
                    <div id="author">
                        <%- obj.author %>
                    </div>
                     <ul class="story-actions">
                         <li class="share" data-sharing="31">
                             <a href="#" class="icon-share variable-border-hover variable-color" title="Share">Share</a>
                         </li>
                         <li class="view" data-sharing="31">
                             <a href="#" class="icon-view variable-border-hover variable-color" title="View">View</a>
                         </li>

                    </ul>
                </article>
            </li>
        <% }) %>
        </ul>
        <div style="clear:both;"></div>
    </div>

</script>