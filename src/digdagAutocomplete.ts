"use strict";

import {
  CompletionItemProvider,
  CompletionItem,
  CompletionItemKind,
  CancellationToken,
  TextDocument,
  Position,
  workspace
} from "vscode";

export class DigdagAutocomplete implements CompletionItemProvider {
  private static readonly keywords = [
    "!include :",
    "_background:",
    "_check:",
    "_command:",
    "_do:",
    "_else_do:",
    "_error:",
    "_export:",
    "_parallel:",
    "_retry:",
    "_type:",
    "alert:",
    "duration:",
    "fail:",
    "schedule:",
    "sla:",
    "time:",
    "skip_on_overtime:"
  ];

  private static readonly operators = [
    "bq>:",
    "bq_ddl>:",
    "bq_extract>:",
    "bq_load>:",
    "call>:",
    "cron>:",
    "daily>:",
    "echo>:",
    "embulk>:",
    "emr>:",
    "fail>:",
    "for_each>:",
    "for_range>:",
    "gcs_wait>:",
    "hourly>:",
    "http>:",
    "http_call>:",
    "if>:",
    "loop>:",
    "mail>:",
    "minutes_interval>:",
    "monthly>:",
    "param_get>",
    "param_set>",
    "pg>:",
    "py>:",
    "rb>:",
    "redshift>:",
    "redshift_load>:",
    "redshift_unload>:",
    "require>:",
    "s3_wait>:",
    "sh>:",
    "td>:",
    "td_ddl>:",
    "td_for_each>:",
    "td_load>:",
    "td_partial_delete>:",
    "td_run>:",
    "td_table_export>:",
    "td_wait>:",
    "td_wait_table>:",
    "weekly>:"
  ];

  private static readonly variables = [
    "timezone",
    "session_uuid",
    "session_id",
    "session_time",
    "session_date",
    "session_date_compact",
    "session_local_time",
    "session_tz_offset",
    "session_unixtime",
    "last_session_time",
    "last_session_date",
    "last_session_date_compact",
    "last_session_local_time",
    "last_session_tz_offset",
    "last_session_unixtime",
    "next_session_time",
    "next_session_date",
    "next_session_date_compact",
    "next_session_local_time",
    "next_session_tz_offset",
    "next_session_unixtime",
    "last_executed_session_time",
    "last_executed_session_date",
    "last_executed_session_date_compact",
    "last_executed_session_local_time",
    "last_executed_session_tz_offset",
    "last_executed_session_unixtime",
    "task_name"
  ];

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): Promise<CompletionItem[]> {
    const conf = workspace.getConfiguration("digdag");
    if (!conf.codeCompletion.enable) {
      return Promise.resolve([]);
    }

    const range = document.getWordRangeAtPosition(position);
    const prefix = range ? document.getText(range) : "";

    const result = DigdagAutocomplete.makeProposals(
      prefix,
      DigdagAutocomplete.keywords,
      CompletionItemKind.Keyword
    ).concat(
      DigdagAutocomplete.makeProposals(
        prefix,
        DigdagAutocomplete.variables,
        CompletionItemKind.Variable
      ),
      DigdagAutocomplete.makeProposals(
        prefix,
        DigdagAutocomplete.operators,
        CompletionItemKind.Operator
      )
    );

    return Promise.resolve(result);
  }

  private static makeProposals(
    prefix: string,
    labels: string[],
    kind: CompletionItemKind
  ): CompletionItem[] {
    const prefixLength = prefix.length;
    return labels
      .filter(label => {
        return (
          prefixLength === 0 ||
          (label.length >= prefixLength &&
            label.substr(0, prefixLength) === prefix)
        );
      })
      .map(label => {
        const item = new CompletionItem(label);
        item.kind = kind;
        return item;
      });
  }
}
