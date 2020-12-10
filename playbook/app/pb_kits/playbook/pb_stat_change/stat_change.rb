# frozen_string_literal: true

module Playbook
  module PbStatChange
    class StatChange
      include Playbook::Props

      partial "pb_stat_change/stat_change"

      prop :change, type: Playbook::Props::Enum,
                    values: %w[neutral increase decrease],
                    default: "neutral"
      prop :icon, type: Playbook::Props::String
      prop :value, type: Playbook::Props::Numeric

      def status
        case change
        when "increase"
          "positive"
        when "decrease"
          "negative"
        else
          "neutral"
        end
      end

      def returned_icon
        if icon
          icon
        else
          case change
          when "increase"
            "arrow-up"
          when "decrease"
            "arrow-down"
          else
            false
          end
        end
      end

      def classname
        generate_classname("pb_stat_change_kit", status)
      end
    end
  end
end
