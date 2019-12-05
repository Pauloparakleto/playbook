# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      class TextInputBuilder < Module
        def initialize(method_name)
          define_method method_name do |name, props: {}, **options, &block|
            props[:label] = @template.label(@object_name, name) if props[:label] == true
            options = Hash(options)
            options[:skip_default_ids] = false unless options.has_key?(:skip_default_ids)
            input = super(name, **options, &block)

            @template.pb_rails("text_input", props: props) do
              input
            end
          end
        end
      end
    end
  end
end
