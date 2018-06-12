require 'redcarpet'

module RedcarpetHelper
  def markdown(text)
    options = {
      filter_html:     false,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true,
      no_styles: false,
      safe_links_only: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      fenced_code_blocks: true,
      tables: true,
      disable_indented_code_blocks: false,
      strikethrough: true,
      underline: true,
      highlight: true,
      footnotes: true,
      with_toc_data: true,
    }

    renderer = HTMLBlockCode.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end
end

class HTMLBlockCode < Redcarpet::Render::HTML
  def header(title, level)
    if level == 2
      @headers ||= []
      permalink = title.gsub(/\W+/, "-")
      if @headers.include?(permalink)
        permalink += "_1"
        loop do
          break if !@headers.include?(permalink)
          permalink.gsub!(/\_(\d+)$/, "_#{$1.to_i + 1}")
        end
      end
      @headers << permalink
      %(\n<h#{level} id=\"#{permalink}\"><a name="#{permalink}" class="markdown-header-anchor anchor" href="##{permalink}"><span class="fa fa-link anchor-icon"></span></a>#{title}</h#{level}>\n)
    else
      %(\n<h#{level}>#{title}</h#{level}>\n)
    end
  end

  def playbook_snippet(full_document)
    full_document.gsub! /\[snippet (.*)\]/ do
      @random_id = Random.rand(40)
      @string = $1
      @default_height = '160'
      @default_show = true
      @default_expand = false
      @attr = ['', @default_height, @default_show]

      # Set id from attributes
      @string.gsub(/id="(.*?)"/) do
        @attr[0] = $1
      end

      # Set height from attributes
      @string.gsub(/height="(.*?)"/) do
        if $1
          @attr[1] = $1
        else
          @attr[1] = @default_height
        end
      end

      @string.gsub(/preview="(.*?)"/) do
        if $1
          if $1 == "false"
            @attr[2] = false
          else
            @attr[2] = $1
          end
        else
          @attr[2] = @default_show
        end
      end

      @string.gsub(/expand="(.*?)"/) do
        if $1
          if $1 == "true" || $1 == true
            @attr[3] = true
          else
            @attr[3] = false
          end
        else
          @attr[3] = @default_expand
        end
      end

      @snippet_content = Page.where(id: @attr[0]).first

      if @snippet_content.present?
        @snippet_encoded = (CGI.escapeHTML @snippet_content.body_markdown).html_safe
        @iframe = %(\n\n)
        @image_preview = %(\n\n)
        @action_buttons = %(\n\n)
        @action_buttons = %(\n<div class="snippet-actions pb-4"><a onclick="toggleSnippet(event, 'snippet#{@random_id}')" class="uix-component-link toggle">View code</a><a onclick="copySnippet(event, 'snippet#{@random_id}')" class="uix-component-link copy">Copy snippet</a></div>\n)

        if @attr[2] == true
          @iframe = %(\n<iframe id="snippet#{@random_id}" scrolling="no" src="/snippet/#{@attr[0]}" width="100%" height="#{@attr[1]}"></iframe>\n)
        else
          @iframe = %(\n<iframe class="snippet-hidden" id="snippet#{@random_id}" scrolling="no" src="/snippet/#{@attr[0]}" width="0" height="0"></iframe>\n)
        end

        if @attr[2] != true && @attr[2] != false
          @image_preview = %(\n<div class="snippet-preview-image"><a href="#{Rails.application.routes.url_helpers.preview_snippet_path(@attr[0])}" target="_blank" class="uix-component-link preview-image-link m-4 p-0"><img src="#{@attr[2]}" /></a></div>\n)
          @action_buttons = %(\n<div class="snippet-actions pb-4"><a onclick="toggleSnippet(event, 'snippet#{@random_id}')" class="uix-component-link toggle">View code</a><a onclick="copySnippet(event, 'snippet#{@random_id}')" class="uix-component-link copy">Copy snippet</a><a href="#{Rails.application.routes.url_helpers.preview_snippet_path(@attr[0])}" target="_blank" class="uix-component-link preview-window">Preview</a></div>\n)
        end

        if @attr[3] == true
          @code = %(\n<pre class="mx-4 toggle-snippet-preview line-numbers language-markup shown"><code>#{@snippet_encoded}</code></pre>\n)
          @action_buttons = %(\n<div class="snippet-actions pb-4"><a onclick="copySnippet(event, 'snippet#{@random_id}')" class="uix-component-link copy">Copy snippet</a></div>\n)
        else
          @code = %(\n<pre class="mx-4 toggle-snippet-preview line-numbers language-markup"><code>#{@snippet_encoded}</code></pre>\n)
        end

        %(\n<div class="uix-component-frame uix-snippet-frame">#{@iframe}#{@image_preview}#{@action_buttons}#{@code}</div>\n)
      end

    end
    full_document
  end

  def storybook_component(full_document)
    full_document.gsub! /\[component (.*)\]/ do
      @string = $1
      @default_height = '160'
      @attr = ['', @default_height]

      # Set src from attributes
      @string.gsub(/src="(.*?)"/) do
        @attr[0] = $1
      end

      # Set height from attributes
      @string.gsub(/height="(.*?)"/) do
        if $1
          @attr[1] = $1
        else
          @attr[1] = @default_height
        end
      end

      %(\n<div class="uix-component-frame uix-storybook-frame"><iframe scrolling="no" id="component-preview" src="#{@attr[0]}" width="100%" height="#{@attr[1]}"></iframe><a href="#{@attr[0]}" target="_blank" class="uix-component-link">View component</a></div>\n)
    end
    full_document
  end

  def preprocess(full_document)
    playbook_snippet(full_document)
    storybook_component(full_document)
  end

  def list(contents, list_type)
    @contents = contents
    @list_items = contents.split("\n")

    if @list_items[0].include? "[do]" or @list_items[0].include? "[dont]"
      @element_items = []
      @list_items.each do |item, index|
        item.gsub(/\<li>(.*)\<\/li>/) do
          @element_items.push($1);
        end
      end

      # Doing both because we could have either/both
      # clean up
      @dont_items, @trash_items_dont = @element_items.partition { |x, i|  x.include? "[dont]" }
      @do_items, @trash_items_do = @element_items.partition { |x, i|  x.include? "[do]" }

      @do_list = []
      @do_items.each do |item, index|
        @do_list.push("<li>#{item.sub('[do] ', '')}</li>")
      end
      @do_list = "<ul class='uix-ruleset do-list'>#{@do_list.join("")}</ul>"

      @dont_list = []
      @dont_items.each do |item, index|
        @dont_list.push("<li>#{item.sub('[dont] ', '')}</li>")
      end
      @dont_list = "<ul class='uix-ruleset dont-list'>#{@dont_list.join("")}</ul>"

      "<div class='row uix-ruleset-block'><div class='col-sm-6'>#{@do_list}</div><div class='col-sm-6'>#{@dont_list}</div></div>"
    else
      @contents
    end
  end
end
